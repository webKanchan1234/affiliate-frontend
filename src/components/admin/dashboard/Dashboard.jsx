import React, { useEffect } from "react";
import { FiBox, FiGrid, FiTag, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import { getProducts } from "../../../redux/actions/productAction";
import { allUsersAction } from "../../../redux/actions/userAction";
import { getAllBrandsAction } from "../../../redux/actions/brandAction";
import { getAllPaymentsAction } from "../../../redux/actions/paymentAction";

const Dashboard = () => {

  const dispatch=useDispatch()
  const { categories } = useSelector((state) => state.categories);
  const { brands, loading, error } = useSelector((state) => state.allBrands);
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const {users}=useSelector(state=>state.allUsers);
  const { payments} = useSelector(state => state.allPayments);
  
    // console.log(payments)


  // console.log(products)
  const stats = [
    { id: 1, title: "Total Products", count: products.content?.length, icon: <FiBox />, color: "bg-green-500" },
    { id: 2, title: "Total Categories", count: categories.length, icon: <FiGrid />, color: "bg-blue-500" },
    { id: 3, title: "Total Brands", count: brands.length, icon: <FiTag />, color: "bg-yellow-500" },
    { id: 4, title: "Total Users", count: users.length, icon: <FiUsers />, color: "bg-red-500" },
    { id: 4, title: "Total Orders", count: payments.length, icon: <FiBox />, color: "bg-purple-500" },
  ];

  useEffect(() => {
    dispatch(getAllBrandsAction())
    dispatch(getAllCategories())
    dispatch(getProducts());
    dispatch(allUsersAction())
    dispatch(getAllPaymentsAction());
  }, [dispatch])
  

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <p className="text-gray-600 mb-6">Monitor and manage your platform data effectively.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat,index) => (
          <div key={`${stat.id}_${index}`} className={`p-6 rounded-lg shadow-md text-white ${stat.color} flex items-center justify-between`}>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.count}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="p-3 border rounded-md shadow-sm">📌 New product added: <b>iPhone 15 Pro Max</b></li>
          <li className="p-3 border rounded-md shadow-sm">📌 New category created: <b>Electronics</b></li>
          <li className="p-3 border rounded-md shadow-sm">📌 Brand updated: <b>Samsung</b></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
