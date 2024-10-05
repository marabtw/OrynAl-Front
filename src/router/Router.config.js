export const ROUTERS = {
  //main
  Home: "/",

  //profile
  Authorization: {
    root: "/auth/*",
    login: "/login",
  },

  Profile: {
    root: "/profile/*",
    myProfile: "/my-profile",
  },

  //management
  Management: {
    root: "/management/*",
    owners: "/owners",
    createOwner: "/owners/create",
    clients: "/clients",
    allRestaurants: "/all-restaurants",
    createRestaurant: "/all-restaurants/create",
  },

  RestaurantServices: {
    root: "/services/*",
    services: "/all-services",
  },

  //restaurants
  Restaurant: {
    root: "/restaurant/*",
    myRestaurants: "/my-restaurants",
    updateRestaurant: "/:restaurantId",
  },

  //table
  RestaurantTable: {
    root: "/restaurant/my-restaurants/:restaurantId/table/*",
    myRestaurantTables: "/tables-list",
    createTable: "/tables-list/create",
    updateTable: "/tables-list/:tableId",
    myRestaurantTable: "/tables-list/:tableId",
  },

  //menu
  RestaurantMenu: {
    root: "/restaurant/my-restaurants/:restaurantId/menu/*",
    myRestaurantMenu: "/menus-list",
    createFood: "/menus-list/create",
    updateFood: "/menus-list/:menuId",
    myRestaurantMenuFood: "/menus-list/:menuId",
  },

  //orders
  Orders: {
    root: "/orders/*",
    createOrder: "/:restaurantId/create",
    ordersHistory: "/history",
    restaurantOrdersHistory: "/:restaurantId/history",
    orderDetail: "/:orderId",
  },
}
