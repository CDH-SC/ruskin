# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import docx

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin
letPath = "RCL1_49.docx"

letters = []

letNum = 1
doc = docx.Document(letPath)
for i in doc.paragraphs:
	if str(letNum) + ". " in i.text:
		print(i.text)
		letters.append(str(i.text))
		letNum = letNum + 1
	elif letNum != 1:
		letters[letNum-2] += str(i.text)

print(letters[len(letters)-1])