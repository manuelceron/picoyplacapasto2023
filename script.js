const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
    ];

const data = ['0 y 1', '2 y 3', '4 y 5', '6 y 7', '8 y 9'];
const data_colors = {
'No hay resricción' : 'transparent',
'0 y 1' : '#01d95d', 
'2 y 3' : '#ffffff', 
'4 y 5' : '#ff2a00', 
'6 y 7' : '#e3e305', 
'8 y 9' : '#71aedf',
};
const data_class = {
'No hay resricción' : '',
'0 y 1' : 'rest_tipo_1', 
'2 y 3' : 'rest_tipo_2', 
'4 y 5' : 'rest_tipo_3', 
'6 y 7' : 'rest_tipo_4', 
'8 y 9' : 'rest_tipo_5',
};


function distribute() {
//restición para la rimera semana y generacion e los ciclos siguientes

const result = [];
for (let i = 0; i < data.length; i++) {
const group = data.slice(i).concat(data.slice(0, i));
result.push(group);
}
return result;
}
function get_cycle(date=''){
if(date=='') date = new Date();
const number = 5;
initial_cycle = getWeekNumber(date);
let initial_cycleinitial_cycle = initial_cycle;
let cycle = initial_cycle;
let log = '';
if(initial_cycle>number){
        log = 'Semana: '+initial_cycleinitial_cycle;
        let cycle_mod = 0; 
        cycle_mod = cycle%number;
        while (cycle > number) {
            log += ' - Cambios a: '+cycle;
            cycle = cycle - number
            log += ' - Cambios d: '+cycle;
        }
        log += ' - Resultado: '+cycle;
        log += ' - Sobra: '+cycle_mod;
        log += ' - Sobrar: '+Math.trunc(cycle_mod);
      
        cycle = cycle_mod;
        
        if(cycle == 0) {
            cycle = 4;
        }else{
            cycle = cycle - 1;
        }
        if(cycle == 5) {
            cycle = 0;
        }
        cycle = Math.trunc(cycle);
}else{
    initial_cycle = initial_cycle - 1;
    cycle = Math.trunc(initial_cycle);
    log = 'Inicio: '+initial_cycleinitial_cycle;
    log += ' - cycle: '+cycle;
}
//console.log(log);
return cycle;
}

function restriction(date){
cycle = get_cycle(date);
const dayOfWeek = date.getDay();
resp = restrs[cycle][dayOfWeek];
return resp;
}
const myDate = document.querySelector("#date");

if(myDate.value=='') myDate.value = new Date();

const btn = document.querySelector("#get_restriction");
btn.addEventListener('click',function(){
fn_get_restriction();
});
function fn_get_restriction(){
    const date = new Date(document.querySelector("#date").value);
    const spam_restriction = document.querySelector("#restriction");
    resp = restriction(date);
    spam_restriction.innerHTML = resp;
    
    const clase1 = document.createAttribute("class");
    clase1.value = data_class[resp];
    spam_restriction.setAttributeNode(clase1);    
}

function getWeekNumber(d) {
// Crea una fecha con el 1 de enero del año dado
var date = new Date(Date.UTC(d.getFullYear(), 0, 1));
// Obtiene el número de milisegundos desde el 1 de enero hasta la fecha dada
var diff = d - date;
// Divide el número de milisegundos por la cantidad de milisegundos en una semana
var oneWeek = 1000 * 60 * 60 * 24 * 7;
// Devuelve el número de semanas
const weekNumber = Math.ceil(diff / oneWeek);
return weekNumber;
}



function header_calendar(){
let row = document.createElement("tr");
//const td11 = document.createElement("td"); td11.textContent = 'G'; row.appendChild(td11);
const td1 = document.createElement("td"); td1.textContent = 'D'; row.appendChild(td1);
const td2 = document.createElement("td"); td2.textContent = 'L'; row.appendChild(td2);
const td3 = document.createElement("td"); td3.textContent = 'M'; row.appendChild(td3);
const td4 = document.createElement("td"); td4.textContent = 'M'; row.appendChild(td4);
const td5 = document.createElement("td"); td5.textContent = 'J'; row.appendChild(td5);
const td6 = document.createElement("td"); td6.textContent = 'V'; row.appendChild(td6);
const td7 = document.createElement("td"); td7.textContent = 'S'; row.appendChild(td7);
return row;
}
function generate_calendar(){
const div_calendar = document.querySelector("#calendar");
const currentYear = 2023;
let date = new Date('01/01/'+currentYear);
let cycle = 0;
for (let month = 0; month < 12; month++) {
const div = document.createElement('div');
const table = document.createElement('table');
const firstDay = new Date(currentYear, month, 1);
const numDays = new Date(currentYear, month + 1, 0).getDate();
const row_m = document.createElement("tr");
const tdm = document.createElement("th");
const td3 = document.createElement("td");
const colspan = document.createAttribute("colspan");
colspan.value = "7";
tdm.setAttributeNode(colspan);
tdm.textContent = monthNames[month];
const class4 = document.createAttribute("class");
class4.value = "text-center";
tdm.setAttributeNode(class4);
row_m.appendChild(tdm);
table.appendChild(tdm);
const rh = header_calendar();
table.appendChild(rh);
let row = document.createElement("tr");
let cycle_nm = 0;

for (let i = 0; i < firstDay.getDay(); i++) {
    if( i == 0){
    // const tdcycle = document.createElement("td"); 
        //tdcycle.textContent = cycle_nm; 
    // row.appendChild(tdcycle);
    }
    const emptyCell = document.createElement("td");
    row.appendChild(emptyCell);
}
for (let day = 1; day <= numDays; day++) {
    date = new Date((month+1)+"/"+day+"/"+currentYear);

    cycle = get_cycle(date);
    
    cycle_nm = cycle;
    

    
    const cur_date = new Date((month+1)+"/"+day+"/"+currentYear);

    
    
    restrs = distribute();
    
    
    
    const dayOfWeek = cur_date.getDay();
    
    resp = restrs[cycle][dayOfWeek-1];
    if(dayOfWeek==0){
        
        table.appendChild(row);
        row = document.createElement("tr");

    // const tdcycle = document.createElement("td"); 
    // tdcycle.textContent = cycle; 
    // row.appendChild(tdcycle);
    }
    //console.log([day,monthNames[month],currentYear]);
    const cell = document.createElement("td");
    //cell.textContent = dayOfWeek+"-"+day;
    cell.textContent = day;
    const clase2 = document.createAttribute("class");
    clase2.value = data_class[resp];
    cell.setAttributeNode(clase2);
    //cell.style.backgroundColor = data_colors[resp];//data_class[resp]
    row.appendChild(cell);
}
table.appendChild(row);
const clase3 = document.createAttribute("class");
clase3.value = 'table';
table.setAttributeNode(clase3);

div.appendChild(table);
div.appendChild(table);
const clase = document.createAttribute("class");
clase.value = "col-md-3 month";
div.setAttributeNode(clase);

div_calendar.appendChild(div);
}
}