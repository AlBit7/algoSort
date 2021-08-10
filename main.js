const LARGHEZZA_MASSIMA = 15;
const MAX = innerHeight - 100;
const MIN = 1;

const quantitaBarre = document.getElementById("quantitaBarre");
const corpo = document.getElementById("corpo");
const velocita = document.getElementById("velocita");
const scrittaTipoSort = document.getElementById("tipoSort");

var array;
var sort = 1;
scrittaTipoSort.innerHTML = 'bouble sort';
randomizza();

function prendiLarghezzaBarre(numeroBarre) {

    let larghezzaBarre = innerWidth * 0.95 / numeroBarre;

    if (larghezzaBarre > LARGHEZZA_MASSIMA)
        larghezzaBarre = LARGHEZZA_MASSIMA;

    return larghezzaBarre;

}

function randomizza() {

    corpo.innerHTML = "";
    array = [];

    let numeroDiBarre = parseInt(quantitaBarre.value);
    let larghezza = prendiLarghezzaBarre(numeroDiBarre);

    for (let i = 0; i < numeroDiBarre; ++i) {

        let altezza = Math.floor(Math.random() * (MAX - MIN) + MIN);

        array.push(altezza);
        corpo.innerHTML += `<div id="${i}" class="barra" style="width: ${larghezza}px; height: ${altezza}px;"></div>`;

    }

}

function riordina() {

    let bottone = document.getElementById("riordina");

    bottone.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-ocean');
    bottone.innerHTML = "<div class='loader --7'></div>";
    //bottone.onclick = console.log("aspetta che finisca!!");
    
    switch (sort) {

        case 1:
            boubleSort();
            break;

        case 2:
            selectionSort();
            break;

        case 3:
            insertionSort();
            break;

        case 4:
            faiQuickSort();
            break;

        case 5:
            mergeSort(array);
            break;

        case 6:
            heapSort(array.length);
            break;

        case 7:
            cocktailSort();
            break;

        case 8:
            combSort();
            break;

        case 9:
            shellSort();
            break;

        case 10:
            faiStoogeSort();
            break;

        case 11:
            oddevenSort();
            break;

        default:
            scrittaTipoSort.innerHTML = 'selezionare sort';
            break;
    }

}

// ------------------------------------------ BOUBLE SORT ------------------------------------------

async function boubleSort() {

    let n = parseInt(quantitaBarre.value);
    let j, i;

    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - i - 1; j++) {

            document.getElementById(j).style.backgroundColor = "red";

            if (array[j] > array[j + 1]) {
                document.getElementById(j + 1).style.backgroundColor = "blue";
                swap(j, j + 1);
            }
            
            await sleep(velocita.value);
            document.getElementById(j).style.backgroundColor = document.getElementById(j + 1).style.backgroundColor = "";

        }

    finito();

}

// ------------------------------------------ SELECTION SORT ------------------------------------------

async function selectionSort() {

    let min;

    for (let i = 0; i < array.length; i++) {

        min = i; //  storing the index of minimum element

        for (let j = i + 1; j < array.length; j++) {

            let tmp = min

            document.getElementById(j).style.backgroundColor = "red";
            document.getElementById(tmp).style.backgroundColor = "blue";

            if (array[min] > array[j])
                min = j; // updating the index of minimum element

            await sleep(velocita.value);
            document.getElementById(j).style.backgroundColor = document.getElementById(tmp).style.backgroundColor = "";

        }

        if (i !== min)
            swap(i, min);

    }

    finito();

}

// ------------------------------------------ INSERTION SORT ------------------------------------------

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

// ------------------------------------------ MERGE SORT ------------------------------------------

// https://stackoverflow.com/questions/55288158/javascript-merge-sort-visualisation
async function mergeSort(arr) {

    let arrays = [arr.slice()],
        n = arr.length,
        array0 = arr,
        array1 = new Array(n);

    for (let m = 1; m < n; m <<= 1) {
        for (let i = 0; i < n; i += (m << 1)) {
            merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
        }
        arrays.push(array1.slice());
        arr = array0, array0 = array1, array1 = arr;
    }

    function merge(left, right, end) {
        for (let i0 = left, i1 = right, j = left; j < end; ++j) {
            array1[j] = array0[i0 < right && (i1 >= end || array0[i0] <= array0[i1]) ? i0++ : i1++];
        }
    }

    for (const iterazione of arrays) {

        let i = 0;

        for (const elemento of iterazione) {

            document.getElementById(i).style.height = elemento.toString() + "px";
            document.getElementById(i).style.backgroundColor = "red";

            await sleep(velocita.value);

            document.getElementById(i++).style.backgroundColor = "";
        }

    }

    array = arrays[-1];

    finito();

}

// ------------------------------------------ QUICK SORT ------------------------------------------

// https://www.geeksforgeeks.org/quick-sorthoares-partition-visualization-using-javascript/
async function hoarePartition(l, r) {

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
                document.getElementById(j + 1).style.backgroundColor = "blue"; // giallo blu è il colore dell'ellas!!
            document.getElementById(j).style.backgroundColor = "red";

            await sleep(velocita.value);

        } while (array[j] > pivot);

        // If two pointers met.
        if (i >= j) {

            for (var k = 0; k < array.length; k++)
                document.getElementById(k).style.backgroundColor = "";

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
        let pivot_idx = await hoarePartition(l, r);
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

// ------------------------------------------ HEAP SORT ------------------------------------------

// https://www.geeksforgeeks.org/heap-sort-visualization-using-javascript/
async function heapify(n, i) {

    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && array[l] > array[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && array[r] > array[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {

        swap(i, largest);

        document.getElementById(i).style.backgroundColor = "blue"
        document.getElementById(largest).style.backgroundColor = "red";

        await sleep(velocita.value);

        document.getElementById(i).style.backgroundColor = document.getElementById(largest).style.backgroundColor = "";

        // Recursively Hapify the affected sub-tree
        await heapify(n, largest);

    }

}

async function heapSort(n) {

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(n, i);

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {

        // Move current root to end
        swap(i, 0);

        await sleep(velocita.value);

        // Call max Heapify on the reduced heap
        await heapify(i, 0);

    }

    finito();

}

// ------------------------------------------ COCKTAIL SORT ------------------------------------------

// https://algostructure.com/sorting/cocktailsort.php
async function cocktailSort() {

    let n = 0;
    let m = array.length - 1;

    while (n <= m) {

        for (let i = n; i < m; i++) {

            document.getElementById(i).style.backgroundColor = "red";

            if (array[i] > array[i + 1])
                swap(i, i + 1);

            await sleep(velocita.value);
            document.getElementById(i).style.backgroundColor = "";
        }
        m--;

        for (let j = m; j > n; j--) {

            document.getElementById(j).style.backgroundColor = "red";

            if (array[j] < array[j - 1])
                swap(j, j - 1);

            await sleep(velocita.value);
            document.getElementById(j).style.backgroundColor = "";
        }
        n++;

    }

    finito();

}

// ------------------------------------------ COMB SORT ------------------------------------------

async function combSort() {

    let gap = array.length;
    let shrink = 1.3;
    let swapped = false;
    let i;

    while (gap != 1 || swapped) {

        gap = parseInt(gap / shrink);

        if (gap < 1)
            gap = 1;

        i = 0;
        swapped = false;

        while (i + gap < array.length) {

            document.getElementById(i + gap).style.backgroundColor = document.getElementById(i).style.backgroundColor = "red";
            await sleep(velocita.value);

            if (array[i] > array[i + gap]) {
                swap(i, i + gap);
                swapped = true;
            }

            document.getElementById(i + gap).style.backgroundColor = document.getElementById(i).style.backgroundColor = "";
            i++;

        }
    }

    finito();

}

// ------------------------------------------ SHELL SORT ------------------------------------------

async function shellSort() {

    let gaps = [701, 301, 132, 57, 23, 10, 4, 1];
    let tmp;
    let i, j;

    for (let gap of gaps) {
        for (i = gap; i < array.length; i++) {

            tmp = array[i];

            for (j = i; j >= gap && array[j - gap] > tmp; j -= gap) {

                array[j] = array[j - gap];
                document.getElementById(j).style.height = array[j - gap].toString() + "px";

                document.getElementById(j).style.backgroundColor = "blue";
                document.getElementById(i).style.backgroundColor = "red";
                await sleep(velocita.value);
                document.getElementById(j).style.backgroundColor = document.getElementById(i).style.backgroundColor = "";

            }

            document.getElementById(j).style.backgroundColor = "yellow";
            array[j] = document.getElementById(j).style.height = tmp;
            document.getElementById(j).style.height = tmp.toString() + "px";
            await sleep(velocita.value);
            document.getElementById(j).style.backgroundColor = "";

        }
    }

    finito();

}

// ------------------------------------------ STOOGE SORT ------------------------------------------

async function stoogeSort(i, j) {

    document.getElementById(i).style.backgroundColor = document.getElementById(j).style.backgroundColor = "red";
    await sleep(velocita.value);
    document.getElementById(i).style.backgroundColor = document.getElementById(j).style.backgroundColor = "";

    let t;

    if (array[j] < array[i])
        swap(i, j);

    if ((j - i + 1) >= 3) {

        t = parseInt((j - i + 1) / 3);
        await stoogeSort(i, j - t);
        await stoogeSort(i + t, j);
        await stoogeSort(i, j - t);

    }

}

async function faiStoogeSort() {

    await stoogeSort(0, array.length - 1);
    finito();

}

// ------------------------------------------ ODD EVEN SORT ------------------------------------------

async function oddevenSort() {

    let sorted = false;

    while (!sorted) {

        sorted = true;

        for (let i = 1; i < array.length - 1; i += 2) {

            document.getElementById(i).style.backgroundColor = "red";
            await sleep(velocita.value);
            document.getElementById(i).style.backgroundColor = "";

            if (array[i] > array[i + 1]) {
                swap(i, i + 1);
                sorted = false;
            }
        }

        for (let i = 0; i < array.length - 1; i += 2) {

            document.getElementById(i).style.backgroundColor = "red";
            await sleep(velocita.value);
            document.getElementById(i).style.backgroundColor = "";

            if (array[i] > array[i + 1]) {
                swap(i, i + 1);
                sorted = false;
            }
        }

    }

    finito();

}

// radix sort

// ------------------------------------------ FUNZIONI AUSILIARIE ------------------------------------------

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

async function finito() {

    let bottone = document.getElementById("riordina");

    bottone.style.backgroundColor = "";
    bottone.innerHTML = "Riordina";
    //bottone.onclick = riordina();

    let barre = document.getElementsByClassName("barra");
    let n, j;
    if (barre.length % 2 == 0) 
        n = j = barre.length;
    else {
        n = barre.length + 1;
        j = barre.length;
    } 

    for (let i = 0; i < n / 2; ++i) {

        barre[i].style.backgroundColor = "red";
        barre[--j].style.backgroundColor = "red";

        await sleep(5);

        barre[i].style.backgroundColor = "green";
        barre[j].style.backgroundColor = "green";

    }

}

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    //document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("menu").style = "visibility: hidden;";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
    document.getElementById("menu").style = "visibility: visible;";
}
