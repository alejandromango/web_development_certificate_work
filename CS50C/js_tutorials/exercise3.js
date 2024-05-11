let size = 20;
let oddRowAtom = " #";
let evenRowAtom = "# ";
let oddRow = oddRowAtom.repeat(Math.floor(size/2)) + " ".repeat(size % 2) + "\n";
let evenRow = evenRowAtom.repeat(Math.floor(size/2)) + "#".repeat(size % 2) + "\n";
let gridAtom = oddRow + evenRow;
let grid = gridAtom.repeat(Math.floor(size/2)) + oddRow.repeat(size % 2);
console.log(grid);


let returnString = "";
let i = 1;
for (let j = 1;j <= size;){
    if (i % 2 == 1){
        returnString += " ";
    } else {
        returnString += "#";
    }
    i++;
    if (i >= (size + (j % 2))){
        returnString += "\n";
        j++;
        i = j % 2;
    }
}
console.log(returnString)