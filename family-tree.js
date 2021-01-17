

class FamilyTree {
  constructor (value) {
      if (!value || typeof value !== 'string') {
        throw 'error: invalid input';
      }
      this.generation = null;
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

      if (value === this.value) {
        node = this;
        return node;
      }

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

//<<---------------HTML BELOW------------------->>
let counter = 0;
let progenitor;
let g2counter = 0;
let g3counter = 0;

let enterSubmitBtn = document.getElementById('submitBtn');
enterSubmitBtn.addEventListener('click', function() {
    let parent = document.getElementById('enterParent').value;
    let nameChild = document.getElementById('enterName').value;
    document.getElementById('enterParent').value = '';
    document.getElementById('enterName').value = '';
    console.log(parent);
    console.log(nameChild);

    //if first time clicking
    if (counter === 0) {
        progenitor = new FamilyTree(nameChild);
        progenitor.generation = 1;
        document.getElementById('g1-info1').innerHTML = progenitor.value;

    //if we have progenitor
    } else {

        //if parent is progenitor
        if (parent === progenitor.value) {
            progenitor.insert(nameChild);
            let newMember = progenitor.findMember(nameChild)
            newMember.generation = 2;
            g2counter++;
            document.getElementById(`g2-info${g2counter}`).innerHTML = newMember.value;
        } else {

          //if parent is a child of the progenitor
            let parentIsInTree = false;
            progenitor.children.forEach(child => {
              if (child.value === parent) {
                parentIsInTree = true;
              }
            })

            if (parentIsInTree === true) {
                let thisParent = progenitor.findMember(parent);
                thisParent.insert(nameChild);
                let newMember = progenitor.findMember(nameChild);
                newMember.generation = 3;
                g3counter++;
                document.getElementById(`g3-info${g3counter}`).innerHTML = newMember.value;
            }
        }
      }

    counter++;
})

//module.exports = FamilyTree;
