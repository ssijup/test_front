import { number } from "yup";

export const allusercoloumn=[
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email,
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone,
        sortable: true,
      }
]

export const nonpurchsedUserColoumn=[
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email,
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone,
        sortable: true,
      }
]

export const nonRefferalUSerColounm=[
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email,
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone,
        sortable: true,
      }
]

// export const purchasedUserColoumn=[
//     {
//         name: 'Name',
//         selector: (row) => row?.user?.name,
//         sortable: true,
//       },
//       {
//         name: 'Email',
//         selector: (row) => row?.user?.email,
//         sortable: true,
//       },
//       {
//         name: 'Phone',
//         selector: (row) => row?.user_details?.phone,
//         sortable: true,
//       }
// ]

export const purchasedUserColoumn=[
    {
        name: 'Name',
        selector: (row) => row?.user_link.user?.name,
        sortable: true,
      },
      {
        name: 'Products Name',
        selector: (row) => row?.product?.name,
        sortable: true,
      },
      {
        name: 'Products amt',
        selector: (row) => row?.payment_total_amount_paid
        ,
        sortable: true,
      },
      {
        name: 'Purchased on',
        selector: (row) => {
          const earnedDate = new Date(row.payment_done_at);
          return earnedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour : 'numeric',
            minute : 'numeric'
          }).replace(/\//g, '-');
        },
        sortable: true,
      },
]
