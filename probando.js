async function test(){
  return 1;
};
console.log('A');
async function main() {
  let result = await test();
  console.log(result);
}
main()

async function test(){
  return 1;
};

let result = await test();
console.log(result);
