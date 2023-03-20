// produk
function select() {
    let Url = "https://dummyjson.com/products";
    let no = 1;
    axios({
        method : 'get',
        url : Url,
    }).then(res=>{
        console.log(res)
        let tampil = `<h1>Data Produk</h1> 
        <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#example" onclick="Form()"> Tambah Barang </button>  
        <table class="table">
        <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Deskripsi</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Cart</th>
        </tr>`;
        res.data.products.forEach(el => {
            tampil += 
            `<tr>
                <td>${no++}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td><button type="button" id="up" class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#updatebarang" onclick="showData('${el.id}')"> Update </button> </td>
                <td><button type="button" class="btn btn-danger " onclick="Delete('${el.id}')"> Delete </button> </td>
                <td><button type="button" class="btn btn-primary " onclick="cart('${el.id}')"> Cart </button> </td>
            </tr>`
        });
        tampil += '</table>';
        document.querySelector('#out').innerHTML = tampil;
    });

}

function kategori(){
    let Url = "https://dummyjson.com/products/categories";
    let tampil ="";
    axios({
        method : 'get',
        url : Url,
    }).then(res=>{
        console.log(res);

        res.data.forEach(el => {
            tampil += 
            `<li class="nav-item"><button class="btn btn-dark btn-kategori m-2" onclick=show('${el}')>${el}</button></li>`
        });
        document.querySelector('#menu').innerHTML = tampil;

    })

}

function show(kat){
    let Url = "https://dummyjson.com/products/category/" + kat;
    let no =1;
    axios({
        method : 'get',
        url : Url
    }).then(res=>{
        console.log(res)
        let tampil = `<h1>Data Produk</h1> 
        <table class="table">
        <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Deskripsi</th>
        </tr>`;
        res.data.products.forEach(el => {
            tampil += 
            `<tr>
                <td>${no++}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
            </tr>`
        });
        tampil += '</table>';
        document.querySelector('#out').innerHTML = tampil;
    });

}

function Form() {
    let Url = "https://dummyjson.com/products/categories";
    // let out = '<option selected>----------</option>';
    axios({
        method : 'get',
        url : Url
    }).then(function(res){
        let jui = '<option selected>----------</option>';
        console.log(res);
        res.data.forEach(res =>{
            jui += `<option value=${res}>${res}</option>`
        });
        document.getElementById('kate').innerHTML = jui;
    })

}

function insert() {
    let Url = "https://dummyjson.com/products/add"
    let data = {
        title : document.getElementById('ti').value,
        description : document.getElementById('description').value,
        category : document.getElementById('kate').value
    }
    axios.post(Url,JSON.stringify(data)).then(res =>{
        console.log(res);
        console.log(data);
        alert((data['title']) + " insert")
    })
}

function showData(id) {
    let Url = "https://dummyjson.com/products/" + id; 
    axios.get(Url).then(response=>{
        document.querySelector('#id').value = response.data.id;
        document.querySelector('#tit').value = response.data.title;
        document.querySelector('#deskripsi').value = response.data.description;
        document.querySelector('#kateg').value = response.data.category;
        document.querySelector('#tit').addEventListener('click',FormUpdate);
        console.log(response);
    });
}

function FormUpdate() {
    let Url = "https://dummyjson.com/products/categories";
    let jui = "";
    axios({
        method : 'get',
        url : Url
    }).then(function(res){
        console.log(res);
        res.data.forEach(res =>{
            jui += `<option value=${res}>${res}</option>`
        });
        document.getElementById('kateg').innerHTML = jui;
    })
}

function update() {
    let id = document.getElementById("id").value;
    let Url = "https://dummyjson.com/products/" + id;
    let data = {
        title : document.getElementById('tit').value,
        description : document.getElementById('deskripsi').value,
        category : document.getElementById('kateg').value
    }
    axios.put(Url,JSON.stringify(data)).then(res=>{
        console.log(data);
        console.log(res);
        alert((data['title']) + " Update")
    })
}

function Delete(id){
    let Url = "https://dummyjson.com/products/" + id;
    let data = {
        id : id
    }
    axios.delete(Url,JSON.stringify(data))
    .then(res=>{
        console.log(res);
        alert(id + " deleted")
    })

}


document.querySelector('#barang').addEventListener('click',select);


// pelanggan
function selectPelanggan(){
    let Url = "http://localhost/tugas-dummy/pages/select.php";
    let no = 1;
    axios({
        method : 'get',
        url : Url
    }).then(res=>{
        console.log(res)
        let tampil = `<h1>Data Pelanggan</h1>
        <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#insert"> Tambah Pelanggan </button>  
        <table class="table">
        <tr>
            <th>No</th>
            <th>Pelanggan</th>
            <th>Alamat</th>
            <th>Telp</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Cart</th>
        </tr>`;
        res.data.forEach(el => {
            tampil += 
            `<tr>
                <td>${no++}</td>
                <td>${el.pelanggan}</td>
                <td>${el.alamat}</td>
                <td>${el.telp}</td>
                <td><button type="button" class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#updatepelanggan" onclick=" showDatapelanggan('${el.idpelanggan}')"> Update </button> </td>
                <td><button type="button" class="btn btn-danger " onclick="deletePelanggan('${el.idpelanggan}')"> Delete </button> </td>
                <td><button type="button" class="btn btn-primary " onclick="cartPelanggan('${el.idpelanggan}')"> Cart </button> </td>
            </tr>`
        });
        tampil += '</table>';
        document.querySelector('#out').innerHTML = tampil;
    });
}

function insertPelanggan() {
    let Url = "http://localhost/tugas-dummy/pages/insert.php";
    let data = {
        pelanggan : document.getElementById('pel').value,
        alamat : document.getElementById('alamat').value,
        telp : document.getElementById('telp').value
    }
    axios.post(Url,JSON.stringify(data)).then(res=>{
        console.log(res);
        alert(res.data);
        selectPelanggan();
    })
}

function showDatapelanggan(id) {
    let Url = "http://localhost/tugas-dummy/pages/selectupdate.php";
    let data = {
        idpelanggan: id
    };
    axios.post(Url, JSON.stringify(data)).then(response=> {
        document.getElementById("idpel").value = response.data.idpelanggan;
        document.getElementById("pela").value = response.data.pelanggan;
        document.getElementById("ala").value = response.data.alamat;
        document.getElementById("telpon").value = response.data.telp;
        console.log(response)
    })
}


 function updatePelanggan() {
    let Url = "http://localhost/tugas-dummy/pages/update.php"
    let datapelanggan = {
        idpelanggan : document.getElementById('idpel').value,
        pelanggan : document.getElementById('pela').value,
        alamat : document.getElementById('ala').value,
        telp : document.getElementById('telpon').value
    }
    axios.post(Url,JSON.stringify(datapelanggan)).then(res=>{
        console.log(res.data);
        alert(res.data);
        selectPelanggan();
    })

 }

 function deletePelanggan(id) {
    let Url = "http://localhost/tugas-dummy/pages/delete.php"
    let idpelanggan = {
        idpelanggan : id
    }
    axios.post(Url,JSON.stringify(idpelanggan)).then(res=>{
        console.log(res);
        alert(res.data);
        selectPelanggan();
    })
 }

document.querySelector('#pelanggan').addEventListener('click',selectPelanggan);

//cart 
function cart(id) {
    let Url = "https://dummyjson.com/products/" + id;
    let out = ""
    axios.get(Url).then(response=>{
        console.log(response);
        out += `<table class="table">
            <tr>
                <th>id</th>
                <th>title</th>
                <th>price</th>
                <th>Id Order By</th>
                <th>Order By</th>
                <th>Alamat</th>
                <th>Jumlah</th>
                <th>Checkout</th>
            </tr>
            <tr>
                <td id="idbenda">${response.data.id}</td>
                <td id="benda">${response.data.title}</td>
                <td id="price">${response.data.price}</td>
                <td id="idpelanggan" class="id"></td>
                <td id="pelangga" class="pelanggan"></td>
                <td id="alam" class="alamat"></td>
                <td ><input class="form-control" type="number" id="jumlah"></td> 
                <td><button type="submit" onclick="addtocart()" class="btn btn-primary">Beli</button></td>
            </tr> 
        </table> `;
        document.querySelector('#keranjang').innerHTML=out;
    }) 
}

function cartPelanggan(id){
    let Url = "http://localhost/tugas-dummy/pages/selectwhere.php?id=" + id;
    axios.get(Url).then(res=>{
        console.log(res)
        let idpelanggan = "";
        let alamat = "";
        let pelanggan = "";
        idpelanggan += res.data.idpelanggan
        pelanggan += res.data.pelanggan
        alamat += res.data.alamat
        document.querySelector('.id').innerHTML= idpelanggan;
        document.querySelector('.pelanggan').innerHTML= pelanggan;
        document.querySelector('.alamat').innerHTML= alamat;
    })
}

function addtocart(idbarang,barang,harga) {
    let Url = "http://localhost/tugas-dummy/pages/addtocart.php";
    let idorder = 1;
    let datacart = {
        idorder : idorder,
        idbarang : document.getElementById('idbenda').textContent,
        jumlah : document.getElementById('jumlah').value,
        harga : document.getElementById('price').textContent,
        barang : document.getElementById('benda').textContent,
        idpelanggan : document.getElementById('idpelanggan').textContent,
        pelanggan : document.getElementById('pelangga').textContent,
        alamat : document.getElementById('alam').textContent
    }
    axios.post(Url,JSON.stringify(datacart)).then(res=>{
        console.log(res.data);
        alert(res.data);
    })
}