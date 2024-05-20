
// let data:String="padam";
// let firstName:String="padam";
// let isvalid:Boolean = false;


// const avenger:string[] =["A", "B", "C", "D", "E"]

// const love:Array<string> = ["A","B","r"]


// //tuple 
// let person:[number, string, ...string[]]= [1, "Saurabh","jj","kk"]
// console.log(person)

// class Products{
//     readonly id:number;
//     name:string;
//     address:string;
// }

// interface Product extends Products {
//     readonly id:number,
//     name:string,
//     price:number,
//     islove?:string
// }
// let prod1:Product = {
//     id:23,
//     name:"padam",
//     price:100,
//     address:"s"
// }

function addTwoNumber(value1:number=32, value2:number=32):number {
    const sum = value1 + value2
    return sum;
}

const result = addTwoNumber();
console.log(result)