const year = 2023;
const div_calendar = "#calendar";
/*
data representa el arreglo de la restricción para la primera semana.
los campos test_tipo_<n> se utilizan para los estilos  de acuerdo a tipo de restricción.
*/
const data = {
    'No hay resricción' : '',
    '0 y 1' : 'rest_tipo_1', 
    '2 y 3' : 'rest_tipo_2', 
    '4 y 5' : 'rest_tipo_3', 
    '6 y 7' : 'rest_tipo_4', 
    '8 y 9' : 'rest_tipo_5',
    };
  const restriction = new Restriction(data,2023,div_calendar);
  restriction.generate_calendar();
  function fn_get_restriction(){
    const date = new Date(document.querySelector("#date").value);
    const spam_restriction = document.querySelector("#restriction");
    resp = restriction.get_restriction(date);
    spam_restriction.innerHTML = resp;
    
    const clase1 = document.createAttribute("class");
    clase1.value = restriction.data_class[resp];
    spam_restriction.setAttributeNode(clase1);    
}
fn_get_restriction();