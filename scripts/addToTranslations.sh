FILE='../packages/web/src/modules/shared/i18n/dictionaries/nl.json'
cat $FILE > temp.json

cat temp.json | jq '.example.details."0".details.title = "todo"' > temp2.json

cat temp2.json > $FILE