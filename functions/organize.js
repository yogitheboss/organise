let fs = require('fs');
const path = require('path');
let utility = require('./utility')
// function to organise a folder on basis of category from utility
function organiseFn(dirPath, desPath) {

    // pseudoCode:
    // 1. input- directoryname 
    // 2. makedirectory - organized directory
    // 3. based on extension - identify category
    // 4. copy files based on category to the category folders


    // if path isn't provided
    if (dirPath == undefined) {
        dirPath = process.cwd()
        desPath = dirPath
    }
    // if directory provided is valid
    if (fs.existsSync(dirPath)) {

        // make an organised files directory in the provided directory
        desPath = path.join(desPath, 'organised_files')

        // if organised files directory isn't already present make one
        if (fs.existsSync(desPath) === false) {
            fs.mkdirSync(desPath)
        }


        // call organise helper functon to organise based on provided directory and destination directory
        organiseHelper(dirPath, desPath)
        console.log("🙂Organised Successfully");

    } else {
        console.log("🙂Kindly Provide valid directory name");
        return
    }

}



function organiseHelper(src, des) {

    // get all files/folder names
    let childNames = fs.readdirSync(src)

    childNames.forEach((child, index) => {
        // iterate over all the children and see if they are files , if they are organise them

        childNames[index] = path.join(src, child)
        if (fs.lstatSync(childNames[index]).isFile() === true) {

            // call getCategory function to see the category of file
            let category = getCategory(childNames[index])

            // if categroy is found
            if (category != 'notfound') {

                let filename = path.parse(childNames[index]).base
                let categoryFolder = path.join(des, `${category}`)
                if (fs.existsSync(categoryFolder) === false) {
                    fs.mkdirSync(categoryFolder)
                }
                let destinationPath = path.join(categoryFolder, `${filename}`)
                fs.copyFileSync(childNames[index], destinationPath)
                fs.unlinkSync(childNames[index])

            }
        }
    })

    function getCategory(location) {

        let extension = path.extname(location).slice(1)

        for (key in utility.types) {
            for (idx in utility
                .types[key]) {
                if (extension == utility
                    .types[key][idx]) {
                    return key;
                }
            }

        }
        return 'notfound'
    }
}


module.exports = {
    organiseFn: organiseFn
}