import {createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SkillContext = createContext();

const initialForm = {
    name : "",
    slug : "",
}

const initialProduct = {
    kategori : "",
    title : "",
    description : "",
    price : "",
}

const initialPelanggan = {
    pelanggan : "",
    alamat : "",
    telp : ""
}

export const SkillProvider = ({ children }) => {
    const [formValues, setFormValues] = useState(initialForm);    
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState([]);
    const [erorrs, setErrors] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value})
    }

    const getSkills = async() => {
        const apiProducts = await axios.get("http://127.0.0.1:8000/api/v1/skills");
        setSkills(apiProducts.data.data);
    };

    const getSkill = async (id) => {
    const respoonse = await axios.get("http://127.0.0.1:8000/api/v1/skills/" + id);
    const apiSkill = respoonse.data.data;
    setSkill(apiSkill);
    setFormValues({
      name: apiSkill.name,
      slug: apiSkill.slug,
    });
  }

    const storeSkill = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/api/v1/skills", formValues);
            setFormValues(initialForm);
            navigate("skills");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const updateSkill = async(e) => {
        e.preventDefault();
        try{
            await axios.put("http://127.0.0.1:8000/api/v1/skills/" + skill.id, formValues);
            setFormValues(initialForm);
            navigate("skills");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const deleteSkill = async (id) => {
        if (!window.confirm("Data Akan Dihapus ?")) {
            return;
        }
        await axios.delete("http://127.0.0.1:8000/api/v1/skills/" + id);
        getSkills();
    }

// Product
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [formProducts, setFormProducts] = useState(initialProduct); 

    const onProducts = (e) => {
        const {name, value} = e.target;
        setFormProducts({...formProducts,[name]:value})
    }

    const getProducts = async() => {
        const apiProducts = await axios.get("http://127.0.0.1:8000/api/v1/products");
        setProducts(apiProducts.data.data);
    };

    const getProduct = async (id) => {
        const respoonse = await axios.get("http://127.0.0.1:8000/api/v1/products/" + id);
        const apiProduct = respoonse.data.data;
        setProduct(apiProduct);
        setFormProducts({
          kategori: apiProduct.kategori,
          title: apiProduct.title,
          description: apiProduct.description,
          price: apiProduct.price
        });
      }

    const storeProduct = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/api/v1/products", formProducts);
            setFormProducts(initialProduct);
            navigate("products");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const updateProduct = async(e) => {
        e.preventDefault();
        try{
            await axios.put("http://127.0.0.1:8000/api/v1/products/" + product.id, formProducts);
            setFormValues(initialProduct);
            navigate("products");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const deleteProduct = async (id) => {
        if (!window.confirm("Data Akan Dihapus ?")) {
            return;
        }
        await axios.delete("http://127.0.0.1:8000/api/v1/products/" + id);
        getProducts();
    }
// Pelanggan
    const [pelanggans, setPelanggans] = useState([]);
    const [pelanggan, setPelanggan] = useState([]);
    const [formPelanggans, setFormPelanggans] = useState(initialPelanggan); 

    const onPelanggans = (e) => {
        const {name, value} = e.target;
        setFormPelanggans({...formPelanggans,[name]:value})
    }

    const getPelanggans = async() => {
        const apiPelanggans = await axios.get("http://127.0.0.1:8000/api/v1/pelanggan");
        setPelanggans(apiPelanggans.data.data);
    };

    const getPelanggan = async(id) => {
        const respoonse = await axios.get("http://127.0.0.1:8000/api/v1/pelanggan/" + id);
        const apiPelanggan = respoonse.data.data;
        setPelanggan(apiPelanggan);
        setFormPelanggans({
          pelanggan: apiPelanggan.pelanggan,
          alamat: apiPelanggan.alamat,
          telp : apiPelanggan.telp
        });
    }

    const storePelanggan = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/api/v1/pelanggan", formPelanggans);
            setFormProducts(initialPelanggan);
            navigate("pelanggans");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const updatePelanggan = async(e) => {
        e.preventDefault();
        try{
            await axios.put("http://127.0.0.1:8000/api/v1/pelanggan/" + pelanggan.id, formPelanggans);
            setFormValues(initialPelanggan);
            navigate("pelanggans");
        }catch(e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    const deletePelanggan = async (id) => {
        if (!window.confirm("Data Akan Dihapus ?")) {
            return;
        }
        await axios.delete("http://127.0.0.1:8000/api/v1/pelanggan/" + id);
        getPelanggans();
    }


// Cart

    const [cartProduct,setCartProduct] = useState([]);
    const [cartPelanggan,setCartPelanggan] = useState([]);
    const [counter,setCounter] = useState(1);

    const productCart = async(id) =>{
        const respoonse = await axios.get("http://127.0.0.1:8000/api/v1/products/" + id);
        setCartProduct(respoonse.data.data);
    }

    const pelangganCart = async(id) =>{
        const respoonse = await axios.get("http://127.0.0.1:8000/api/v1/pelanggan/" + id);
        setCartPelanggan(respoonse.data.data);
    }

    const tambah = async() =>{
        setCounter(counter + 1);
    }

    const kurang = async() =>{
        setCounter(counter - 1);
    }

    const checkout = () => {
        let data = {
            ib : cartProduct.id,
            jumlah : counter,
            harga : cartProduct.price * counter,
            barang : cartProduct.title,
            ip : cartPelanggan.id,
            pelanggan : cartPelanggan.pelanggan,
            alamat : cartPelanggan.alamat,
        }

        axios.post("http://127.0.0.1:8000/api/v1/order", data);
        navigate("/");

    }




    return <SkillContext.Provider 
        value={{ skill, skills, getSkill, getSkills, onChange, formValues, storeSkill, erorrs, setErrors, updateSkill,deleteSkill,getProducts,products,storeProduct,onProducts,formProducts,getProduct,updateProduct,deleteProduct, pelanggans,getPelanggans,storePelanggan,formPelanggans,onPelanggans,updatePelanggan,getPelanggan,deletePelanggan, productCart,pelangganCart,tambah,kurang,checkout,setCartPelanggan,setCartProduct, cartProduct,cartPelanggan,counter,setCounter }}>
    {children}</SkillContext.Provider>
}

export default SkillContext;