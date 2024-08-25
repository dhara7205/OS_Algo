let n, m, i, j, k;
n = 5; // Number of processes
m = 3; // Number of resources
let test = 0;
let alloc = [ [ 0, 1, 0 ], // P0 // Allocation Matrix
				[ 2, 0, 0 ], // P1
				[ 3, 0, 2 ], // P2
				[ 2, 1, 1 ], // P3
				[ 0, 0, 2 ], //P4
				]; 

let max = [ [ 7, 5, 3 ], // P0 // MAX Matrix
			[ 3, 2, 2 ], // P1
			[ 9, 0, 2 ], // P2
			[ 2, 2, 2 ], // P3
			[ 4, 3, 3 ], //P4
			 ]; 

let total = [ 10, 5, 7 ]; 		
//let avail = [ 3, 3, 2, 0 ]; // Available Resources

let avail1 = [];			//this is the addition of already allocated resources 
for (i = 0; i < m; i++) {
    avail1[i] = 0;
}

// Initialize the 2D array with zeroes
let availHistory = [];
for (let i = 0; i < n; i++) {
    availHistory[i] = [];
    for (let j = 0; j < m; j++) {
        availHistory[i][j] = 0;
    }
}

// Function to update the availHistory array with the current avail values
function updateAvailHistory(avail,n) {
   
        for (let j = 0; j < m; j++) {
            availHistory[n][j] = avail[j];
        }
}



let avail = [];			//this is the currently available resources 

for(i = 0; i < m; i++){
    for(j=0;j<n;j++){
    avail1[i] += alloc[j][i]; 
    }
}

function checkSafe(avail1,total){			//function to check if we will get safe sequence or not
	for(i=0;i<n;i++){
		if(avail1[i]>total[i]){				//if addition of allocated is greater than the total resources that mean no safe sequence
			return 0;
		}
	}

	return 1;
}

let CS = checkSafe(avail1,total);	

if(CS == 1){						//CS value 1 then safe sequence
for (i = 0; i < m; i++){      
	 avail[i] = total[i] - avail1[i];
}

//console.log(avail);
updateAvailHistory(avail,test);

let f = [], ans = [], ind = 0;
for (k = 0; k < n; k++) {
	f[k] = 0;
}
let need = [];
for (i = 0; i < n; i++) {
	let need1 = [];
	for (j = 0; j < m; j++)
	need1.push(max[i][j] - alloc[i][j]);
	need.push(need1);
}

let y = 0;
for (k = 0; k < n; k++) {
	for (i = 0; i < n; i++) {
	if (f[i] == 0) {

		let flag = 0;
		for (j = 0; j < m; j++) {
		if (need[i][j] > avail[j]){
			flag = 1;
			break;
		}
		}

		if (flag == 0) {
		ans[ind++] = i;
		for (y = 0; y < m; y++){
			avail[y] += alloc[i][y]; }

			if(test<n-1){
		test++;
		updateAvailHistory(avail,test);
			}
		f[i] = 1;
		}
	}
	}
}

var sequence = "Safe sequence array ";

/*for (i = 0; i < n - 1; i++) {
    sequence += "P" + ans[i] + " -> ";
}
sequence += "P" + ans[n - 1] + " ";

console.log(sequence); */

for(i=0;i<n;i++){
	console.log(ans[i])
}

}

else{								//CS value 0 no safe sequence
	console.log("No safe Sequence");
}

//AVAIL MATRIX = availhistory 
console.log(availHistory); 