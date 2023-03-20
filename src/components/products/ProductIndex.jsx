import {useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import SkillContext from "../../context/SkillContext";

export const ProductIndex = () => {
    const {products,getProducts,deleteProduct,productCart} = useContext(SkillContext);
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <div className="mt-12">
            <div className="flex justify-end m-2 p-2">
                <Link to="/products/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">New Product</Link>
            </div>   
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                            <th scope="col" className="px-6 py-3">Beli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>{return (
                        <tr key={product.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{product.title}</td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">{product.price}</td>
                            <td className="px-6 py-4"><Link to={`/products/${product.id}/edit`} className="px-4 py-2 bg-yellow-500 hover:bg-indigo-700 text-white rounded-md">Edit</Link></td>
                            <td className="px-6 py-4"><button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-500 hover:bg-indigo-700 text-white rounded-md">Delete</button></td>
                            <td className="px-6 py-4"><button onClick={() => productCart(product.id)} className="px-4 py-2 bg-red-500 hover:bg-indigo-700 text-white rounded-md">Beli</button></td>
                        </tr>
                         
                    )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}