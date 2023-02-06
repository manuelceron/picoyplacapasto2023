class Restriction {
    constructor(data,currentYear,target) {
      this.target = target;
      this.data_class = data;
      this.data = Object.keys(data);
      this.data.shift();
      this.currentYear = currentYear;
      this.monthNames = [
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
    }
  
    distribute() {
        //restición para la rimera semana y generacion e los ciclos siguientes
    
        const result = [];
        for (let i = 0; i < this.data.length; i++) {
        const group = this.data.slice(i).concat(this.data.slice(0, i));
        result.push(group);
        }
        return result;
    }
    getWeekNumber(d) {
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
    get_cycle(date=''){
        if(date=='') date = new Date();
        const number = 5;
        let initial_cycle = this.getWeekNumber(date);
        let cycle = initial_cycle;
        if(initial_cycle>number){
                let cycle_mod = 0; 
                cycle_mod = cycle%number;
                while (cycle > number) {
                    cycle = cycle - number
                }
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
        }
        return cycle;
    }
    get_restriction(date){
        const cycle = this.get_cycle(date);
        const dayOfWeek = date.getDay();
        const distributes = this.distribute();
        return distributes[cycle][dayOfWeek];
    }
    header_calendar(){
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
    generate_calendar(){
        //dibuja el calendario de año de la variable currentYear
        //hay que tener en cuenta que si el año cambia se debe ajustar el ciclo de la primera semana
        const div_calendar = document.querySelector(this.target);
        
        let date = new Date('01/01/'+this.currentYear);
        let cycle = 0;
        for (let month = 0; month < 12; month++) {
            const div = document.createElement('div');
            const table = document.createElement('table');
            const firstDay = new Date(this.currentYear, month, 1);
            const numDays = new Date(this.currentYear, month + 1, 0).getDate();
            const row_m = document.createElement("tr");
            const tdm = document.createElement("th");
            const td3 = document.createElement("td");
            const colspan = document.createAttribute("colspan");
            colspan.value = "7";
            tdm.setAttributeNode(colspan);
            tdm.textContent = this.monthNames[month];
            const class4 = document.createAttribute("class");
            class4.value = "text-center";
            tdm.setAttributeNode(class4);
            row_m.appendChild(tdm);
            table.appendChild(tdm);
            const rh = this.header_calendar();
            table.appendChild(rh);
            let row = document.createElement("tr");
            let cycle = 0;

            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyCell = document.createElement("td");
                row.appendChild(emptyCell);
            }
            for (let day = 1; day <= numDays; day++) {
                const date = new Date((month+1)+"/"+day+"/"+this.currentYear);
                cycle = this.get_cycle(date);
                const restrs = this.distribute();
                const dayOfWeek = date.getDay();
                let resp = restrs[cycle][dayOfWeek-1];
                if(dayOfWeek==0){
                    table.appendChild(row);
                    row = document.createElement("tr");
                }
                const cell = document.createElement("td");
                cell.textContent = day;
                const clase2 = document.createAttribute("class");
                clase2.value = this.data_class[resp];
                cell.setAttributeNode(clase2);
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

  }