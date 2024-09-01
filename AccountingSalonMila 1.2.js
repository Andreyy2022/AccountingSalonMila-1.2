'use strict'

let service = document.querySelector('#service');
let cash = document.querySelector('#cash');
let card = document.querySelector('#card');
let costs = document.querySelector('#costs');
let button = document.querySelector('#button');
let table = document.querySelector('#table');
let ARR = [];

button.addEventListener('click', function() {
	
	if(service.value !== '' || cash.value !== '' || card.value !== '' || costs.value !== '') {

		let date = new Date();

		let obj = {
			service_: '',
			cash_: '',
			card_: '',
			costs_: '',
			date_: date.toLocaleDateString(),
			sumDay: '',
			sumMonth_: '',
			profMonth_: ''
		}

		obj.service_ = service.value;
		obj.cash_ = cash.value;
		obj.card_ = card.value;
		obj.costs_ = costs.value;

		if (localStorage.getItem('firstData') !== null) {
			ARR = JSON.parse(localStorage.getItem('firstData'));
		}

		ARR.push(obj);
		let json = JSON.stringify(ARR);
		localStorage.setItem('firstData', json);
	}
});

let newARR = JSON.parse(localStorage.getItem('firstData')).reverse();

if (newARR !== null) {
	
	for (let elem of newARR) {
		let TR = document.createElement('tr');
		table.appendChild(TR);
	
		for (let key in elem) {
			let TD = document.createElement('td');
			TD.innerHTML = elem[key];
			TR.appendChild(TD);
		}

		let cellLast = document.createElement('td');
		cellLast.innerHTML = 'удаление';
		TR.append(cellLast);
	
		cellLast.addEventListener('click', function() {
			let question = confirm('Ирина, действительно хочешь удалить ?');
			
			if (question) {
				delete elem.service_;
	
				newARR = newARR.filter(element => element.service_ !== undefined);
	
				localStorage.setItem( 'firstData', JSON.stringify(newARR.reverse()) );
			}
		});
	}	

}

let rows = table.rows;
//let lastIndexToProf = [];
//let index = [];
//let sum = 0;
//let k = 1;
let sumDay = 0;
let sumDayCash = 0;
let sumDayCard = 0;

for (let i = rows.length - 1; i < rows.length ; i--) {

    if (rows[i].cells[4].innerHTML[1] !== rows[i-1].cells[4].innerHTML[1] && (i-1) !== 0) {
		console.log('(.)(.)');
		console.log(rows[i-1].cells[1].innerHTML);

		for (let j = i; j < rows.length; j++) {

			if (Number(+rows[j].cells[1].innerHTML)) {sumDayCash += +rows[j].cells[1].innerHTML};
			if (Number(+rows[j].cells[2].innerHTML)) {sumDayCard += +rows[j].cells[2].innerHTML};

			if (sumDayCash !== NaN && sumDayCard !== NaN) {
				sumDay = sumDayCash + sumDayCard;
			}

			rows[i].cells[5].innerHTML = sumDay;
			
//			sumDay = 0;
//			sumDayCash = 0;
//			sumDayCard = 0;
		}
	}
		
// ? ниже

/*		for (let j = 1; j < i; j++) {
			index.push(j);
		}

		if (index[index.length-1] === undefined) {
			continue;
		} else {
		lastIndexToProf.push(index[index.length-1]);
		}

		for (k; k <= index[index.length-1]; k++) {
			sum += +rows[k].cells[1].innerHTML + +rows[k].cells[2].innerHTML;
		}	

		rows[lastIndexToProf[lastIndexToProf.length-1]].cells[5].innerHTML = sum + 0.1;
		sum = 0;
*/
/*		for (let j = (rows.length - 1) - rows[i-1].length; j < rows.length - 1; i++)	 {
			sum += rows[i-1].cells[1].innerHTML;
			console.log(sum);
		}
*/
}	


lastIndexToProf = [];
index = [];
sum = 0;
k = 1;

for (let i = 1; i < rows.length; i++) {

	if (rows[i].cells[4].innerHTML[4] !== rows[i-1].cells[4].innerHTML[4]) {

		for (let j = 1; j < i; j++) {
			index.push(j);
		}

		if (index[index.length-1] === undefined) {
			continue;
		} else {
			lastIndexToProf.push(index[index.length-1]);
		}

		for (k; k <= index[index.length-1]; k++) {
			sum += +rows[k].cells[5].innerHTML;
		}	

		rows[lastIndexToProf[lastIndexToProf.length-1]].cells[6].innerHTML = sum + 0.01;
		sum = 0;
	}
}

lastIndexToProf = [];
index = [];
sum = 0;
k = 1;

for (let i = 1; i < rows.length; i++) {

	if (rows[i].cells[4].innerHTML[4] !== rows[i-1].cells[4].innerHTML[4]) {

		for (let j = 1; j < i; j++) {
			index.push(j);
		}

		if (index[index.length-1] === undefined) {
			continue;
		} else {
			lastIndexToProf.push(index[index.length-1]);
		}

		for (k; k <= index[index.length-1]; k++) {
			sum += +rows[k].cells[5].innerHTML - +rows[k].cells[3].innerHTML;
		}	

		rows[lastIndexToProf[lastIndexToProf.length-1]].cells[7].innerHTML = sum + 0.001;
		sum = 0;
	}
}


//localStorage.clear();