#!/bin/bash
for file in *.txt
do
    iconv --from-code=WINDOWS-1250 --to-code=UTF-8 -o "$file.new" "$file"
    mv -f "$file.new" "$file"
done
