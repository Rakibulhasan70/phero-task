import React from 'react';

const TableData = ({ product }) => {
    const { userId, title } = product
    return (
        <tr>
            <td>{userId}</td>
            <td>{title}</td>
        </tr>
    );
};

export default TableData;