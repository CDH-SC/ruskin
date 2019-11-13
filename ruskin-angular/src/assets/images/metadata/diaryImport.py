# Copyright 2019
# Code written by Ian McDowell
from pymongo import MongoClient
import xlrd

# sets up connection with local database
client = MongoClient('localhost:27017')
db = client.ruskin

#sets path to metadata and sets up a workbook
mdPath = ("VLLCMetadata.xlsx")
wb = xlrd.open_workbook(mdPath) 
diaryMD = wb.sheet_by_index(0)

# adds diaries to the database
for row in range(1,diaryMD.nrows):

	# makes the pages of the diary
	pages = []
	for pRow in range(2,wb.sheet_by_index(row).nrows):
		currDiary = wb.sheet_by_index(row)
		page = {
			'title' : currDiary.cell_value(pRow,0),
			'image' : currDiary.cell_value(pRow,15)
		}
		pages.append(page)
	# puts everything into a diary object
	diary = {
		'_id' : diaryMD.cell_value(row,14).replace('RF_MS_',''),
		'creator' : diaryMD.cell_value(row,1),
		'date' : diaryMD.cell_value(row,2),
		'description' : diaryMD.cell_value(row,3),
		'extent' : diaryMD.cell_value(row,4),
		'digital_collection' : diaryMD.cell_value(row,5),
		'website' : diaryMD.cell_value(row,6),
		'contributing_institution' : diaryMD.cell_value(row,7),
		# 'rights' : diaryMD.cell_value(row,8),
		'language' : diaryMD.cell_value(row,9),
		'digitization_specifications' : diaryMD.cell_value(row,10),
		'type' : diaryMD.cell_value(row,11),
		'format' : diaryMD.cell_value(row,12),
		'notebook_url' : 'assets/images/'+diaryMD.cell_value(row,14)+"/",
		'diary_num' : diaryMD.cell_value(row,14).replace('RF_MS_',''),
		# 'ms_num' : '[ms_num]'+str(row),
		'page' : pages
	}

	# inserts diary into the database
	result = db.diaries.insert_one(diary)

	# notifies user of progress and increments the idNum counter
	print('Created '+str(row)+' of '+str(diaryMD.nrows-1)+' diaries as Diary {1}'.format(diaryMD.ncols - 1,result.inserted_id))

# notifies user of the completion of all imports
print('Successfully imported '+str(diaryMD.nrows-1)+' diaries into the database!')