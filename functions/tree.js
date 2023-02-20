const { count } = require('console');
let fs = require('fs');
const path = require('path');
let utility = require('./utility')

let fileCount=0
let folderCount=0

// function to show tree
function treeFn(dirPath,depth) {
    if(depth==undefined){
        depth=3
    }
    if (dirPath == undefined) {
        dirPath=process.cwd()
        
    }
    // if directory provided is valid
    if (fs.existsSync(dirPath)) {

        // call tree helper functon to print tree based on provided directory
        treeHelper(dirPath, "",depth)

        console.log("for depth of "+depth+": ");
        console.log("the total number of files are: "+fileCount+"");
        console.log("the total number of folders are: "+folderCount+"");
        console.log("You have reached the end of the tree 🌴🌳🌲");

    } else {
        console.log("🙂Kindly Provide valid directory name");
        return
    }

}
function treeHelper(src,indent,depth){
    if(depth==0){
        return
    }
    let childNames = fs.readdirSync(src)
    childNames.forEach((child, index) => {
        // iterate over all the children and see if they are files , if they are organise them

        childNames[index] = path.join(src, child)
        if (fs.lstatSync(childNames[index]).isFile() === true) {
            console.log(indent + "├──" + child);
            fileCount++;
        } else {
            console.log(indent + "└──" + child);
            folderCount++;
            treeHelper(childNames[index], indent + "\t",depth-1)
        }
    })
}



module.exports={
    treeFn:treeFn
}