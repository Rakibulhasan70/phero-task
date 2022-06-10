import React, { useEffect, useState } from 'react';
import TableData from './TableData';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const [searchData, setSearchData] = useState([])



    useEffect(() => {
        fetch(`https://secret-fortress-11551.herokuapp.com/data?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setSearchData(data)
            })
    }, [page, size])

    useEffect(() => {
        fetch('https://secret-fortress-11551.herokuapp.com/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 20)
                setPageCount(pages)
            })
    }, [])

    const onChange = e => {
        const change = e.target.value;
        const match = products.filter(search => search.title.includes(change))
        setSearchData(match)
    }


    return (
        <div class="overflow-x-auto">
            <h2>Table Contact</h2>
            <input type="text" placeholder='Text' onChange={onChange} />
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchData.map(product => <TableData
                            key={product._id}
                            product={product}

                        >

                        </TableData>)
                    }


                </tbody>
            </table>
            <div className='pagination w-50 mx-auto my-5'>

                <h5 className='px-3'>Page:</h5>
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button
                            className={page === number ? 'selected' : ''}
                            onClick={() => setPage(number)}
                        >{number + 1}</button>)
                }
                <select onChange={e => setSize(e.target.value)}>
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Home;