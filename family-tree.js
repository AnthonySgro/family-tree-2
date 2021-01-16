

class FamilyTree {
  constructor (value) {
      if (!value || typeof value !== 'string') {
        throw 'error: invalid input';
      }
      
      this.value = value;
      this.children = [];
  }

  insert(child) {
    let newChild = new FamilyTree(child);
    this.children.push(newChild);
  }

  familySize() {
    return this.children.length + 1;
  }

  findMember(value) {
      let node = undefined;

      //iterate through children
      for (let i in this.children) {

          //if match, we found it!
          if (this.children[i].value == value) {
              node = this.children[i];

          //if not, and if this node has children, continue search down a level
          } else if (this.children[i].familySize() > 1) {
              node = this.children[i].findMember(value);
          }
      }
      return node;
  }

  log() {
    output += `${numDeep} ${this.value}\n`;

    //calls a recursive function that will add everybody
    inner(this);

    //console.log(`Output:\n${output.substring(0,output.length - 1)}`);
    return output.substring(0,output.length - 1);
  }
}

let numDeep = '--';
let output = '';

function inner(member) {
  numDeep += '--'
  if (member.children.length === 0) {
    return;
  } else {
    member.children.forEach(child => {
      if (child.familySize() > 1) {
        output +=`${numDeep} ${child.value}\n`;
        inner(child);
        numDeep = numDeep.substring(2,numDeep.length);
      }
      if (child.familySize() === 1) {
        output +=`${numDeep} ${child.value}\n`;
      }
    });
  }
  return output;
}



const szwajkowskis = new FamilyTree('Pop');

szwajkowskis.insert('Mike');
szwajkowskis.insert('Amy');
szwajkowskis.insert('Todd');

const mikesFamily = szwajkowskis.findMember('Mike');
mikesFamily.insert('Eliot');
mikesFamily.insert('Elise');
mikesFamily.insert('Cas');
mikesFamily.insert('George');
mikesFamily.insert('Lear');

const amysFamily = szwajkowskis.findMember('Amy');
amysFamily.insert('Henry');
amysFamily.insert('Vivian');



const log = szwajkowskis.log();

console.log(log);

module.exports = FamilyTree;
