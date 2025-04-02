import React from 'react'

const SpecificationTable = ({ specifications1 }) => {
    // const combinedSpecifications = { ...specifications1 };
    if (!specifications1) return null;
    return (

        <div className='w-4/5'>

            <table className="able-auto w-full">

                <thead>
                    <tr className="text-left p-2">
                        <th className="">Feature</th>
                        <th className="">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(specifications1).map(([key, value], index) => (
                        <tr key={key} >
                            <td className='w-3/6 py-1 capitalize'>{key.replace(/([A-Z])/g, " $1")}</td>
                            <td className='w-3/6 py-1'>{value}</td>
                        </tr>


                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SpecificationTable