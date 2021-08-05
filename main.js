const LARGHEZZA_MASSIMA = 20;
const MAX = innerHeight - 50;

const quantitaBarre = document.getElementById("quantitaBarre");
const corpo = document.getElementById("corpo");
const velocita = document.getElementById("velocita");

var array;

function prendiLarghezzaBarre(numeroBarre) {

    let larghezzaBarre = innerWidth * 0.9 / numeroBarre;

    if (larghezzaBarre > LARGHEZZA_MASSIMA)
        larghezzaBarre = LARGHEZZA_MASSIMA;

    return larghezzaBarre;

}

function randomizza() {

    corpo.innerHTML = "";
    array = new Array(0);

    let numeroDiBarre = parseInt(quantitaBarre.value);
    let larghezza = prendiLarghezzaBarre(numeroDiBarre);

    for (let i = 0; i < numeroDiBarre; ++i) {

        let altezza = Math.floor(Math.random() * (MAX - 1) + 1);

        array.push(altezza);
        corpo.innerHTML += `<div id="${i}" class="barra" style="width: ${larghezza - 2}px; height: ${altezza}px;"></div>`;

    }

}

async function boubleSort() {

    let n = parseInt(quantitaBarre.value);
    let j, i;

    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - i - 1; j++) {

            document.getElementById(j).style.backgroundColor = "red";

            await sleep(velocita.value);

            if (array[j] > array[j + 1])

                swap(j, j + 1);

            document.getElementById(j).style.backgroundColor = "";

        }

    finito();

}

async function selectionSort() {

    let min;

    for (let i = 0; i < array.length; i++) {

        min = i; //  storing the index of minimum element

        for (let j = i + 1; j < array.length; j++) {

            document.getElementById(j).style.backgroundColor = "red";

            await sleep(velocita.value);

            if (array[min] > array[j])
                min = j; // updating the index of minimum element

            document.getElementById(j).style.backgroundColor = "";

        }

        if (i !== min)
            swap(i, min);

    }

    finito();

}

async function insertionSort() {

    let tmpNum, tmpH, j;

    for (let i = 1; i < array.length; i++) {
        //store the current value
        tmpNum = array[i];
        tmpH = document.getElementById(i).style.height;
        document.getElementById(i).style.backgroundColor = "red";
        j = i - 1;

        while (j >= 0 && array[j] > tmpNum) {

            document.getElementById(j).style.backgroundColor = "yellow";
            await sleep(velocita.value);
            // move the number
            array[j + 1] = array[j];
            document.getElementById(j + 1).style.height = document.getElementById(j).style.height;
            document.getElementById(j).style.backgroundColor = "";
            j--;
        }

        array[j + 1] = tmpNum; //Inserts the temporary value at the correct position
        document.getElementById(j + 1).style.height = tmpH;
        document.getElementById(i).style.backgroundColor = "";

    }

    finito();

}

// https://stackoverflow.com/questions/55288158/javascript-merge-sort-visualisation
async function mergeSort(arr) {

    var arrays = [arr.slice()],
        n = arr.length,
        array0 = arr,
        array1 = new Array(n);

    for (var m = 1; m < n; m <<= 1) {
        for (var i = 0; i < n; i += (m << 1)) {
            merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
        }
        arrays.push(array1.slice());
        arr = array0, array0 = array1, array1 = arr;
    }

    function merge(left, right, end) {
        for (var i0 = left, i1 = right, j = left; j < end; ++j) {
            array1[j] = array0[i0 < right && (i1 >= end || array0[i0] <= array0[i1]) ? i0++ : i1++];
        }
    }

    for (const iterazione of arrays) {
        
        console.log(iterazione);
        let i = 0;

        for (const elemento of iterazione) {
            document.getElementById(i++).style.height = elemento.toString() + "px";
        }
        
        await sleep(velocita.value);

    }

    array = arrays[-1];
    finito();

}

// https://www.geeksforgeeks.org/quick-sorthoares-partition-visualization-using-javascript/
async function hoare_partition(l, r) {
    
    var pivot = array[l];
  
    var i = l - 1;
    var j = r + 1;
  
    while (true) {

        // Find leftmost element greater than
        // or equal to pivot
        do {

            i++;
            if (i - 1 >= l) 
                document.getElementById(i - 1).style.backgroundColor = "yellow";
            document.getElementById(i).style.backgroundColor = "red";

            await sleep(velocita.value);

        } while (array[i] < pivot);
  
        // Find rightmost element smaller than
        // or equal to pivot
        do {

            j--;
            if (j + 1 <= r) 
                document.getElementById(j + 1).style.backgroundColor = "orange";
            document.getElementById(j).style.backgroundColor = "red";

            await sleep(velocita.value);

        } while (array[j] > pivot);
  
        // If two pointers met.
        if (i >= j) {

            for (var k = 0; k < array.length; k++) 
                document.getElementById(k).style.backgroundColor = "blue";
        
            return j;

        }
  
        //swapping ith and jth element   
        swap(i, j);

        await sleep(velocita.value);

    }
}
  
// Asynchronous QuickSort function
async function quickSort(l, r) {

    // QuickSort Algorithm
    if (l < r) {

        //Storing the index of pivot element after partition
        let pivot_idx = await hoare_partition(l, r);
        //Recursively calling quicksort for left partition
        await quickSort(l, pivot_idx);
        //Recursively calling quicksort for right partition
        await quickSort(pivot_idx + 1, r);

    }

}

async function faiQuickSort() {

    await quickSort(0, array.length - 1);
    finito();

}

// heap sort
// radix sort

function swap(xp, yp) {

    let tmp = array[xp];
    array[xp] = array[yp];
    array[yp] = tmp;

    tmp = document.getElementById(xp).style.height;
    document.getElementById(xp).style.height = document.getElementById(yp).style.height;
    document.getElementById(yp).style.height = tmp;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function finito() {

    let barre = document.getElementsByClassName("barra");

    for (let i = 0; i < barre.length; ++i) {
        barre[i].style.backgroundColor = "green";
    }

}