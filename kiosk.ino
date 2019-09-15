#include <FastLED.h>

#include <WiFi.h>
#include <ESPmDNS.h>
#include <ArduinoOTA.h>
#include <WebServer.h>

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

//Adafruit SSD1306 definitions
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

//FastLED Definitions
#define LED_PIN 23
//#define NUM_LEDS 20
#define BRIGHTNESS 64
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

//Program Definitions
#define NUM_STATIONS 10
#define STBY_LED 14
#define BRIGHTNESS_PIN 32

//Program Variables
int stations[NUM_STATIONS];
const int LED_DIST = 2; //Spacing between LEDS on the chart
const int LED_OFFSET = 3; //Offset from beginning of strip to first lit LED
const int LED_REFRESH_TIME = 50; //Number of milliseconds between LED auto-updates
const int TIME_BEFORE_STBY_WARNING = 5000; //Number of milliseconds of warning before unit enters standby mode
const int STBY_TIME = 10000; //Number of milliseconds of inactivity before unit enters standby mode
const int START_SWITCH_TIME = 5000; //Number of milliseconds between start position switch

const int STBY_LED_OFF_TIME = 1950;
const int STBY_LED_ON_TIME = 50;

boolean stbyLEDOn = false; //Is the Standby LED on?

boolean inputDetected = false; //Has an input been detected? Used for only reducing values by 1 on touch

double brightnessFactor = 0.0;

long lastTime = millis(); //delta time for LED update
long stbyLEDTime = millis(); //delta timer for standby LED status
long startTime = millis(); //delta timer for start position switch

int currStart = 0; //current starting position for screen

//Ultrasonic distance variables
#define TRIGGER 25
#define ECHO 33

long lastMotion = millis(); //Last time someone was in front of the device
long duration;
int distance;

boolean powerSaving = false;
boolean goingToStandby = false;

//const int NUM_LEDS = LED_OFFSET + (LED_DIST * NUM_STATIONS) + 1;
const int NUM_LEDS = 30;

int touchPins[] = {19, 35, 18, 5, 34};
//int ledNums[] = {2, 4, 7, 9, 12, 14, 16, 19, 21, 24};
int ledNums[] = {24, 21, 19, 16, 14, 12, 9, 7, 4, 2};
boolean inputs[] = {0, 0, 0, 0, 0};



//FastLED Variables
CRGB leds[NUM_LEDS];

//Wifi Variables and Declarations
const char* ssid = "HackMIT";
const char* password = "foracause!";

//const char* ssid = "Anthony’s iPhone";
//const char* password = "Shitsfucked";

WebServer server(80);

const char* www_username = "admin";
const char* www_password = "texmix";

void setup() {
  Serial.begin(115200);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.display();
  display.clearDisplay();
  display.setCursor(0, 0);
  display.setTextSize(2);
  display.setTextColor(WHITE);
  writeText("Tex-Mix", 0, 0);
  display.setTextSize(1);
  writeText("Booting Up...", 0, 16);
  writeText("Connecting to WiFi...", 0, 25);
  display.display();
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("WiFi Connect Failed! Rebooting...");
    writeText("Connection Failed", 0, 34);
    writeText("Rebooting...", 0, 43);
    display.display();
    delay(1000);
    ESP.restart();
  }
  ArduinoOTA.begin();

  writeText("Spooling Up Server...", 0, 34);
  display.display();
  
  server.on("/", []() {
    if (!server.authenticate(www_username, www_password)) {
      return server.requestAuthentication();
    }
    server.send(200, "text/plain", "Login OK");
  });
  //Add food POST request, {} is the station # to add to
  server.on("/add/{}", handleAdd);
  server.begin();

  Serial.print("Open http://");
  Serial.print(WiFi.localIP());
  Serial.println("/ in your browser to see it working");
  
  //STATUS LED SETUP
  for(int i = 0; i < sizeof(touchPins) / sizeof(int); i++) {
    pinMode(touchPins[i], INPUT);
    Serial.print("SET INPUT ON PIN ");
    Serial.println(touchPins[i]);
  }

  pinMode(ECHO, INPUT);
  pinMode(TRIGGER, OUTPUT);
  pinMode(STBY_LED, OUTPUT);
  pinMode(BRIGHTNESS_PIN, INPUT);

  //FASTLED SETUP
  delay(1000);
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(BRIGHTNESS);

  //PROGRAM SETUP
  for(int i = 0; i < NUM_STATIONS; i++) {
    stations[i] = 0;
  }

  display.setTextColor(WHITE);
  display.clearDisplay();
  updateStatusScreen(currStart);

  updateLED();

  //Serial.println("TESTING LED");
  
  //FASTLED TEST
  //testLED();

  //SETUP COMPLETE, RESET DELTA TIMERS
  startTime = millis();
  lastTime = millis();
}

void loop() {
  //ArduinoOTA.handle();
  server.handleClient();

  if (millis() - lastTime > LED_REFRESH_TIME) {
    lastTime = millis();
    updateInputs();
    //Serial.println(goingToStandby);
    //Serial.println(powerSaving);
    if(goingToStandby == false & powerSaving == false) {
      //Serial.println("STATUS SCREEN");
      updateStatusScreen(currStart);
    }
    if(millis() - startTime > START_SWITCH_TIME) {
      currStart = 5 - currStart;
      startTime = millis();
    }
    if(goingToStandby == true & powerSaving == false) {
      //Serial.println("STBY SCREEN");
      updateStandbyScreen();
    }
    if(powerSaving == false) {
      updateLED();
      //updateStatusScreen();
    }
    else {
      for(int i = 0; i < NUM_LEDS; i++) {
        leds[i] = CRGB::Black;
      }
      blinkStandbyLED();
      if(stbyLEDOn) {
        digitalWrite(STBY_LED, HIGH);
      }
      else {
        digitalWrite(STBY_LED, LOW);
      }
      FastLED.show();
    }
  }
}

void handleAdd() {
  //GET STATION NUMBER FROM POST REQUEST
  String addFood = server.pathArg(0);
  int ID = addFood.toInt();

  //UPDATE LED
  if(ID < NUM_STATIONS & ID >= 0) {
    Serial.print("ADDING ONE TO: ");
    Serial.println(ID);
    stations[ID] += 1;
    updateLED();
    updateStatusScreen(currStart);
  }
  
  //SEND SOMETHING BACK
  server.send(200, "Success");
}

void updateLED() {
  //FIND MAX FOOD VALUE
  int maxVal = -1;
  int maxID = -1;
  
  for(int i = 0; i < NUM_STATIONS; i++) {
    if(stations[i] > maxVal) {
      maxVal = stations[i];
      maxID = i;
    }
  }

  //UPDATE LED VALUES
  for(int i = 0; i < NUM_STATIONS; i++) {
    if(stations[i] == 0) {
      leds[ledNums[i]].r = (int)(255.0 * brightnessFactor);
      leds[ledNums[i]].g = 0;
    }
    else {
      leds[ledNums[i]].r = (int)(255.0 * brightnessFactor * ((double)maxVal - (double)stations[i]) / (double)maxVal);
      leds[ledNums[i]].g = (int)((double)(255 - leds[i*LED_DIST + LED_OFFSET].r) * brightnessFactor);
    }
  }

  FastLED.show();
}

void updateInputs() {
  //Serial.println("CHECKING INPUTS");
  //Serial.print("LOOP 1 ");
  int numInputs = 0;
  if(inputDetected == false) {
    for(int i = 0; i < sizeof(touchPins) / sizeof(int); i++) {
      if(digitalRead(touchPins[i]) == 1) {
        lastMotion = millis(); //Button pushing resets the standby delta timer
        goingToStandby = false;
        powerSaving = false;
        Serial.print("INPUT DETECTED: ");
        Serial.println(i);
        inputDetected = true;
        inputs[i] = true;
        if(stations[i] > 0) {
          stations[i]--;
        }
      }
    }
    
    digitalWrite(TRIGGER, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER, LOW);
    duration = pulseIn(ECHO, HIGH);
    distance = duration*.034/2;

    if(distance < 100) {
      lastMotion = millis();
      goingToStandby = false;
      if(powerSaving == true) {
        Serial.println("Coming out of standby...");
        powerSaving = false;
        digitalWrite(STBY_LED, LOW);
        updateStatusScreen(currStart);
      }
    }
    if(millis() - lastMotion > (STBY_TIME - TIME_BEFORE_STBY_WARNING) & powerSaving == false) {
      goingToStandby = true;
    }
    if(millis() - lastMotion > STBY_TIME & powerSaving == false) {
      Serial.println("Going into standby...");
      powerSaving = true;
      display.clearDisplay();
      display.display();
    }

    //Update brightness of LEDS based on potentiometer position
    brightnessFactor = (double)analogRead(BRIGHTNESS_PIN) / 4095;
    
    //updateStatusScreen();
  }

  for(int i = 0; i < sizeof(touchPins) / sizeof(int); i++) {
    if(digitalRead(touchPins[i]) == 0) {
      //Serial.print("RESETTING: ");
      //Serial.println(i);
      inputs[i] = false;
    }
  }

  if((inputs[0] | inputs[1] | inputs[2] | inputs[3] | inputs[4]) == false) {
    inputDetected = false;
  }
}

void updateStatusScreen(int startPos) {
  display.setTextColor(WHITE);
  display.clearDisplay();
  display.setTextSize(2);
  writeText("Status", 0, 0);
  display.setTextSize(1);
  for(int i = startPos; i < startPos + 5; i++) {
    writeText("Station " + String(i+1) + ":", 0, (9*(i-startPos) + 16));
  }
  
  for(int i = startPos; i < startPos + 5; i++) {
    if(stations[i] == 0) {
      writeText("No food!", 60 + (((i+1)/10)*6), (9*(i-startPos) + 16));
    }
    else {
      writeNumber(stations[i], 60 + (((i+1)/10)*6), (9*(i - startPos) + 16));
    }
  }
  display.display();
}

void updateStandbyScreen() {
  display.setTextColor(WHITE);
  display.clearDisplay();
  display.setTextSize(2);
  writeText("Standby", 0, 0);
  display.setTextSize(1);
  writeText("Entering standby in:", 0, 16);
  writeNumber((STBY_TIME - (millis() - lastMotion))/1000 + 1, 0, 25);
  display.display();
}

void writeText(String s, int x, int y) {
  display.setCursor(x, y);
  char chars[s.length() + 1];
  s.toCharArray(chars, s.length() + 1);
  
  for(int i = 0; i < (sizeof(chars) / sizeof(char)); i++) {
    display.write(chars[i]);
  }
}

void writeNumber(int val, int x, int y) {
  display.setCursor(x, y);
  int splitvals[(int)log10(val) + 1];
  char chars[sizeof(splitvals) / sizeof(int)];
  if(val > 0) {
    chars[(int)log10(val) + 1];
  }
  else {
    chars[1];
  }
  for(int i = 0; i < (sizeof(splitvals) / sizeof(int)); i++) {
    splitvals[i] = val % 10;
    val = val / 10;
    chars[i] = splitvals[i] + '0';
  }
  for(int i = 0; i < (sizeof(splitvals) / sizeof(int)); i++) {
    display.write(chars[(sizeof(splitvals) / sizeof(int)) - i - 1]);
  }
}

void blinkStandbyLED() {
  if(stbyLEDOn) {
    if(millis() - stbyLEDTime > STBY_LED_ON_TIME) {
      stbyLEDTime = millis();
      stbyLEDOn = false;
    }
  }
  else {
    if(millis() - stbyLEDTime > STBY_LED_OFF_TIME) {
      stbyLEDTime = millis();
      stbyLEDOn = true;
    }
  }
}
