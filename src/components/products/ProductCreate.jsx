import {useContext, useEffect} from "react";
import SkillContext from "../../context/SkillContext";

export const ProductCreate = () => {
    const {formProducts,onProducts,storeProduct,erorrs,setErrors} = useContext(SkillContext);
    useEffect(() => {
        setErrors({});
    },[])
    return (
        <div className="mt-12">
            <form onSubmit={storeProduct} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
                <div className="space-y-6">
                    <div className="mb-4"><label htmlFor="kategori" className="block mb-2 text-sm font-medium">Kategori :</label></div>
                    <input name="kategori" value={formProducts['kategori']} onChange={onProducts} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.kategori && (<span className="text-sm text-red-400">{erorrs.kategori[0]}</span>)}
                    <div className="mb-4"><label htmlFor="title" className="block mb-2 text-sm font-medium">Title :</label></div>
                    <input name="title" value={formProducts['title']} onChange={onProducts} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.title && (<span className="text-sm text-red-400">{erorrs.title[0]}</span>)}
                    <div className="mb-4"><label htmlFor="description" className="block mb-2 text-sm font-medium">Description :</label></div>
                    <input name="description" value={formProducts['description']} onChange={onProducts} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.description && (<span className="text-sm text-red-400">{erorrs.description[0]}</span>)}
                    <div className="mb-4"><label htmlFor="price" className="block mb-2 text-sm font-medium">Price :</label></div>
                    <input name="price" value={formProducts['price']} onChange={onProducts} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.price && (<span className="text-sm text-red-400">{erorrs.price[0]}</span>)}
                </div>
                <div className="my-4">
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Store</button>
                </div>
            </form>
        </div>
    )
}