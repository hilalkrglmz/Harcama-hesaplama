/*//! HTML DEN GELENLER */

const addBtn = document.getElementById('add-btn');
const titleInp = document.getElementById('title-inp');
const priceInp = document.getElementById('price-inp');
const list = document.querySelector('#list');
const checkBox = document.querySelector("#checked");
const totalSpan = document.querySelector('#price-info')
const select = document.querySelector('select')
const userInp =document.querySelector('#user-input')

//!OLAY İZLEYİCİLERİ

addBtn.addEventListener("click", addExpense); /* Şöyle de yazabilirdik: addBtn.onclick = addExpense()=>{
    ... gibi
} */
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);//select veya inputlarda değer değişimini izleme istiyorsak change 
userInp.addEventListener("change",saveUser);
document.addEventListener("DOMContentLoaded",getUser);//domcontentloaded sayfa yenilenmesini izler.

/* toplam fiyat bilgisi */

let totalPrice = 0;


//!Fonksiyonlar

// hem toplam hem de arayüzü güncelleyen fonksiyon

function updateTotal(price) {

    //js de tutulan değişkeni günceller

    totalPrice += price;


    //html toplam alanını günceller

    totalSpan.innerText = totalPrice

   

}


function addExpense(e) {

    /* butona basıldığında default oalrak sayfayı yeniler.
    bunu kaldırmak için şöyle yaparız. */

    e.preventDefault();

    /* KOPYALAMA KISAYOL:bir satırı olduğu gibi aşağıya kopyalamak için shift alt aşağıya yön tuşuna basarız. */


    // console.dir(priceInp) //bu tarz html elemanlarının yalnızca etiketlerini göstermez daha detaylı bilgi verir. Örneğin buraya baktığında
    //priceInp içine yazılan değerin number haline valueAsNumber ile erişebileceğini görürsün.
    
    /* input değerlerine erişme */

    const title = titleInp.value;//console.dir() daha detaylı bilgi basılır console a.
    const price = priceInp.valueAsNumber;//console.dir() daha detaylı bilgi basılır console a.
    // console.dir(checkBox) //böyle baktığında checkbox a tıkladığında check değerinin true, tıklamadığında false olduğunu görürsün. O halde 83.satırda erişmen gereken şey checkbox.check 


    //! 1- inputlardan biri dahi boşsa alert ver ve function ı durdur.

    if (!title || !price) {
        alert("lütfen formu doldurunuz!!")
        return; //function ı durdurur. For döngüsünü kırmak için kullandığımız break gibi burada da return; kullanırız. diğer alert çıkmaz.
    }

    //!2- input doluysa bir kart oluşutur ve html'e gönder. */

    // a)div oluşturma

    const expenseDiv = document.createElement("div");

    //b) class ekleme
    expenseDiv.classList.add("expense");

    
    if (checkBox.checked === true) {
        expenseDiv.classList.add("paid");
    }

    // c-div'in içeriğini belirleme

    expenseDiv.innerHTML = `            
<h2 id="title">${title}</h2>
<h2 id="price">${price}</h2>
<div class="btns">
    <img id="update" src="./images/money.png" alt="">
    <img id="delete" src="./images/delete.png" alt="">
</div>
`;

    //d-oluşan kartı listeye ekleme

    list.appendChild(expenseDiv);

    //e) toplamı güncelle
    updateTotal(price);

    //! 3-Tüm inputları temizle

    titleInp.value = "";
    priceInp.value = "";
    checkBox.checked = false;

}

/* harcamayı siler veya günceller */

function handleUpdate(e) {

    //tıklanılan eleman
    const ele = e.target;

    /* tıklanılan butonun kapsayıcısına /kartına ulaşma */
    const parent = ele.parentElement.parentElement;

    //tıklanılan elemanın id si delete ise çalışır.
    if (ele.id === "delete") {
        //sildiğimiz elemanının fiyatına erişme
        const price = Number(parent.children[1].innerText);

        /* toplam'dan sildiğimiz fiyatı çıkarma */
        updateTotal(-price);


        /* elemanı kaldırma */
        parent.remove();
    }

    /* tıklanılan eleman güncelle ise */

    if (ele.id === "update") {
        parent.classList.toggle("paid");//toggle yoksa ekler varsa var olanı çıkarır.
    }
}

/* node lar filtrelenir. */
function handleFilter(e) {
    const selected = e.target.value;

    // console.dir(list);//list teki childnodelara bakınca listedeki ödenen ödenmeyen elemmanları görürüz.
    //listedeki elemanlara erişiyoruz
    const items = list.childNodes;


    //listedeki her bir eleman için switch case ile yapacağımız sorgu elemanın gözüküp gözükmeyeceğine kara verecek.

    /* map ile dönersek her bir elemanı döner ve dönülen her bir diziden yeni bir dizi oluştururdu. Foreach ile dönmeyi seçtik */
    items.forEach((item) => {
        //seçilen değere göre yapılacak işleme karar verme
        switch (selected) {
            case "all":
                item.style.display="flex";
                break;
            case "paid":
                if(item.classList.contains('paid')){
                    item.style.display="flex";
                }
                else{   
                    item.style.display= 'none';
                }
                break;
            case "not-paid":
                if(!item.classList.contains('paid')){
                    item.style.display="flex";
                }
                else{   
                    item.style.display= 'none';
                }
                break;
        }
    })
}

//kullanıcıyı kaydeder
function saveUser(e){
    localStorage.setItem('username',e.target.value);//localtrorage a bir item eklerken setItem methıdunu kullanırız.

}
//kullanıcı ismini localden alıp input a yazar:

function getUser(){
    //local storage dan ismi al.
    const username=localStorage.getItem("username") || "";

    //kullanıcı ismini inputa aktar
    userInp.value =username;

}