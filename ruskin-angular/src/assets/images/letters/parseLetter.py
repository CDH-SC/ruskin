# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import docx
import re
import os

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin

dirList = sorted(os.listdir('.'))
for kDir in dirList:
	if ".docx" not in kDir:
		dirList.remove(kDir)
print('Adding the following letters to the database:')
print(dirList)


contents = []
dates = []
authors = []
addressees = []

letNum = 1
lineNum = 1

for file in dirList:
	doc = docx.Document(file)
	print(file + ":")
	for i in doc.paragraphs:
		if str(letNum) + ". " in str(i.text):
			temp = str(i.text).split('. ', 1)[1].split(" to ")
			authors.append(temp[0])
			addressees.append(temp[1])
			contents.append("")
			# print(str(letNum) + " " + str(i.text))
			letNum = letNum + 1
			lineNum = 2
		elif letNum != 1:
			if bool(re.findall("‘[0-9][0-9]", str(i.text)) or bool(re.findall("18[0-9][0-9]", str(i.text)))):
				if "Chelsea," in str(i.text) or "Lucerne," in str(i.text) or "Carlyle to Ruskin," in str(i.text):
					dates.append(str(i.text).split(", ", 1)[1])
				else:
					dates.append(str(i.text))
				print(str(i.text) + "\n" + str(len(dates)) + "\t" + str(letNum))
				lineNum = 1
			else:
				contents[letNum-2] += str(i.text) + '\n'

# letNum = 1
# for content in contents:
# 	letter = {
# 			'_id' : letNum,
# 			'date' : "dates[letNum-1]",
# 			'author' : authors[letNum-1],
# 			'addressee' : addressees[letNum-1],
# 			'letter_num' : letNum,
# 			'content' : content
# 		}
# 	result = db.letters.insert_one(letter)
# 	print('Created '+str(letNum)+' of '+str(len(contents))+' as {1}'.format(letNum,result.inserted_id))
# 	letNum += 1
