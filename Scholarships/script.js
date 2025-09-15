class Scholarship {
    constructor(url,name, amount, dueDate) {   
        this.url = url;
        this.name = name;
        this.amount = amount;
        this.dueDate = dueDate;
    }
    getDateString() {
        if (typeof(this.dueDate) == 'string') return this.dueDate;
        if (!this.dueDate) return 'Varies';
        return this.dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
    }
    getAmountNumber() {
        if (this.amount === 0) return '???' 
        return '$' + this.amount.toLocaleString()
    }
}
const scholarships = [
    new Scholarship('https://www.chick-fil-a.com/community-scholars','Chick-fil-A Community Scholars', 25000, new Date('2025-10-29')),
    new Scholarship('https://collegereadywi.org/our-scholarships/','College Ready Wisconsin',0,false),
    new Scholarship('https://www.communityblood.org/donate/students/scholarship-program/', 'Community Blood Center Scholarship', 0, new Date('2026-02-20')),
    new Scholarship('https://www.cffoxvalley.org/scholarships-CF/','Fox Valley Scholarships',0,false),
    new Scholarship('https://www.elks.org/scholars/scholarships/mvs.cfm','Elks Most Valuable Student', '1,000-$7,500', new Date('2024-11-15')),
    new Scholarship('https://www.foxriverscholarshipcenter.org/','Fox River Scholarship Center',0,false),
    new Scholarship('https://www.fvtc.edu/paying-for-college/scholarships/high-school-seniors','FVTC High School Seniors',0,"Unknown"),
    new Scholarship('https://wilegion.org/scholarships','WI American Legion Scholarships','250-$2,500',new Date('2026-03-03')),
]
const allSch = document.querySelector('.scholarships');

function displayScholarships() {
    allSch.innerHTML = '';
    for (let x = 0; x < scholarships.length; x ++) {
        const sch = scholarships[x];
        const schDiv = document.getElementById('template').cloneNode(true);
        schDiv.id = '';
        schDiv.querySelector('.name').innerHTML = `<a class='clickable' href='${sch.url}' target='_blank'>${sch.name}</a>`;
        schDiv.querySelector('.amount').innerText = `${sch.getAmountNumber()}`;
        schDiv.querySelector('.due-date').innerText = sch.getDateString();
        schDiv.style = '';
        allSch.appendChild(schDiv);
    }
}
let sortName = true;
let sortAmount = true;
let sortDate = true;
function sortByName() {
    sortName = !sortName;
    sortAmount = true;
    sortDate = true;
    if (!sortName) scholarships.sort((a, b) => a.name.localeCompare(b.name));
    if (sortName) scholarships.sort((a, b) => b.name.localeCompare(a.name));
    displayScholarships();
}
function sortByAmount() {
    sortAmount = !sortAmount;
    sortName = true;
    sortDate = true;
    if (sortAmount) {
        scholarships.sort((a, b) => {
            const amountA = (typeof a.amount === 'number' && a.amount > 0) ? a.amount : (a.amount === 0 ? Infinity : parseInt(a.amount.split('-$')[1]));
            const amountB = (typeof b.amount === 'number' && b.amount > 0) ? b.amount : (b.amount === 0 ? Infinity : parseInt(b.amount.split('-$')[1]));
            console.log('A: ', amountA);
            console.log('B: ', amountB);
            return amountA - amountB;
        });
    } else {
        scholarships.sort((a, b) => {
            const amountA = (typeof a.amount === 'number' && a.amount > 0) ? a.amount : (a.amount === 0 ? -Infinity : parseInt(a.amount.split('-$')[1]));
            const amountB = (typeof b.amount === 'number' && b.amount > 0) ? b.amount : (b.amount === 0 ? -Infinity : parseInt(b.amount.split('-$')[1]));
            return amountB - amountA;
        });
    }
   
    displayScholarships();
}
function yearFromNow() {
    const now = new Date();
    return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
}
function yearBefore() {
    const now = new Date();
    return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
}
function sortByDate() {
    sortDate = !sortDate;
    sortName = true;
    sortAmount = true;
    console.log('date')
    if (!sortDate) {
        scholarships.sort((a, b) => {
            const dateA = (a.dueDate instanceof Date) ? a.dueDate : (a.dueDate === false ?  yearFromNow(): yearFromNow());
            const dateB = (b.dueDate instanceof Date) ? b.dueDate : (b.dueDate === false ? yearFromNow() : yearFromNow());
            return dateA - dateB;
        });
    } else {
        scholarships.sort((a, b) => {
            const dateA = (a.dueDate instanceof Date) ? a.dueDate : (a.dueDate === false ?  yearBefore(): yearBefore());
            const dateB = (b.dueDate instanceof Date) ? b.dueDate : (b.dueDate === false ? yearBefore() : yearBefore());
            return (dateB - dateA);
        });
    }
    displayScholarships();
}
sortByName();