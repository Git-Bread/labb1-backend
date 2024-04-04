interface course {
    code: string,
    name: string,
    progression: string,
    syllabus: string
}

let content: course[] = [];

//setup of listeners across the board and load logic
function startup() : void {
    const submit1 = document.getElementById("newCourseSubmit");
    const submit2 = document.getElementById("updateCourseSubmit");
    const clear1 = document.getElementById("resetCourseNew");
    const clear2 = document.getElementById("resetCourseUpdate");
    submit1?.addEventListener("click", function(){add(this)});
    submit2?.addEventListener("click", function(){update()});
    clear1?.addEventListener("click", function(){clear(this)});
    clear2?.addEventListener("click", function(){clear(this)});
    if (localStorage.getItem("list")) {
        load();
    }
    if (content != undefined) {
        populate();   
    }
}

function save() : void {
    localStorage.setItem("list", JSON.stringify(content));
}

function load() : void {
    let item = localStorage.getItem("list");
    content = JSON.parse(item as string);
    console.log(content);
}

//creates new elements and populates table
function populate() : void {
    let table = document.getElementsByTagName("table")[0];
    let select = document.getElementsByTagName("select")[0];

    //removes all old tables to stop duplicate
    while (table.children[1]) {
        table.removeChild(table.lastChild as HTMLElement);
    }

    for (let index = 0; index < content.length; index++) {
        //create elements
        let container = document.createElement("tr");
        let codeObject = document.createElement("td");
        let nameObject = document.createElement("td");
        let progressionObject = document.createElement("td");
        let syllabusObject = document.createElement("td");
        let option = document.createElement("option");

        //assign value
        codeObject.innerHTML = content[index].code;
        nameObject.innerHTML = content[index].name;
        progressionObject.innerHTML = content[index].progression;
        syllabusObject.innerHTML = content[index].syllabus;
        option.innerHTML = content[index].code;

        //appends
        container.append(codeObject);
        container.append(nameObject);
        container.append(progressionObject);
        container.append(syllabusObject);
        table.append(container);
        select.append(option);
    }
}

//adds new entry to course array
function add(object : HTMLElement) : void {
    let newCourse = {} as course;
    let form = object.parentElement?.parentElement;

    //checks so that information is not empty
    if (form?.getElementsByTagName("input")[0].value == "" || 
    form?.getElementsByTagName("input")[1].value == "" || 
    form?.getElementsByTagName("input")[2].value == "" || 
    form?.getElementsByTagName("input")[3].value == ""
    ) {
        window.alert("alla fält behöver information");
        return;
    }

    //checks for duplicate
    if (content != undefined) {
        for (let index = 0; index < content.length; index++) {
            if (content[index].code == form?.getElementsByTagName("input")[0].value as string) {
                window.alert("finns redan en kurs med den kurskoden");
                return;
            }
        }   
    }

    //checks for valid input by comparing to regex and checking lenght
    let val = form?.getElementsByTagName("input")[2].value.toLowerCase() as string;
    if (!validCheck(val)) {
        return;
    }
    form?.getElementsByTagName("input")[2].value.toUpperCase();

    newCourse.code = form?.getElementsByTagName("input")[0].value as string;
    newCourse.name = form?.getElementsByTagName("input")[1].value as string;
    newCourse.progression = form?.getElementsByTagName("input")[2].value as string;
    newCourse.syllabus = form?.getElementsByTagName("input")[3].value as string;

    console.log(content);
    content.push(newCourse);
    save();
    clear(object);
    populate();
}
    
function update() : void {
    document.getElementsByTagName("select")[0].value;
    let form = document.getElementsByTagName("form")[1];
    for (let index = 0; index < content.length; index++) {
        if(content[index].code == document.getElementsByTagName("select")[0].value) {
            content[index].name = form.getElementsByTagName("input")[0].value;
            if (!validCheck(form.getElementsByTagName("input")[1].value)) {
                return;
            }
            content[index].progression = form.getElementsByTagName("input")[1].value;
            content[index].syllabus = form.getElementsByTagName("input")[2].value;
        }
    }
    save();
    populate();
}

//emties fields by calling reset
function clear(object : HTMLElement) : void {
    let parent = object.parentElement?.parentElement as HTMLFormElement;
    parent.reset();
}

function validCheck(text: string) : boolean{
    let pattern = /[a-c]/;
    //checks lenght of string
    if (text.length > 1) {
        window.alert("för lång progression, en symbol tack");
        return false;
    }
    
    //checks content of string
    if (!pattern.test(text)) {
        window.alert("invalid progression (a, b, c är correkta)");
        return false;
    }
    return true;
}

window.onload = startup;   