import json
from watson_developer_cloud import VisualRecognitionV3
from picamera import PiCamera
from time import sleep

camera = PiCamera()

camera.start_preview()
sleep(5)
camera.capture('/Images/current_food.jpg')
camera.stop_preview()

visual_recognition = VisualRecognitionV3(
    version='v3',
    iam_apikey='1gkZwFC_6FexLtghypBX9gMAuTh0SzfmX3i6QOjyYHnq'
)

visual_recognition = VisualRecognitionV3(
'2018-03-19',
iam_apikey='1gkZwFC_6FexLtghypBX9gMAuTh0SzfmX3i6QOjyYHnq')

image_path = 'Images'

with open(image_path + '/current_food.jpg', 'rb') as images_file:
    classes = visual_recognition.classify(
        images_file,
        threshold='0.6',
    classifier_ids='food').get_result()
print("Classes: ", classes)
print(json.dumps(classes, indent=2))
classifier = classes["images"][0]["classifiers"][0]["classes"][0]["class"]
confidence = classes["images"][0]["classifiers"][0]["classes"][0]["score"]
if classifier == "non-food":
    print("We are " + str(confidence*100) + " percent sure that there is no food")
else:
    print("We are " + str(confidence*100) + " percent sure that there is " + classifier + " here!")

