-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2024 a las 09:30:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `happypedidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `price`, `description`, `image`) VALUES
(1, 'Pizza Rockstar', 12.50, 'Una explosión de sabores atrevidos, con una base crujiente, salsa de tomate ahumada, queso mozzarella derretido y una combinación de comida única de pepperoni picante, champiñones caramelizados y un toque final de albahaca fresca. ¡Una comida verdadera estrella en cada bocado!', '../imagenes/PizzaRocstar.png'),
(2, 'Taco 3D', 7.50, 'Con tres tipos de carne: suculenta res, jugoso pollo y tierno cerdo, todo envuelto en una tortilla perfectamente dorada. Un taco que eleva lo tradicional con una experiencia tridimensional de texturas y sazones. ¡La comida ideal para los amantes de la carne!', '../imagenes/Taco3D.png'),
(3, 'Baileys', 8.50, 'Esta bebida es perfecta para acompañar postres como helados, pasteles o incluso para añadir un toque especial a tu café. También se puede disfrutar sola, servida con hielo', '../imagenes/Baileys.png'),
(4, 'CocaCola', 2.50, 'La bebida ideal para disfrutar en cualquier ocasión, es una opción versátil que realza el sabor de tus platillos y proporciona un toque de frescura a cada platillo.', '../imagenes/CocaCola.png'),
(5, 'M&M', 1.50, 'Es perfecto para disfrutar solos o como acompañamiento en postres y otras creaciones culinarias. Su dulce tamaño y colores los hacen ideales para decorar pasteles, galletas y helados, añadiendo un toque divertido y delicioso a cualquier plato.', '../imagenes/M&M.png'),
(6, 'Oreo', 1.00, 'Combina dos crujientes galletas de chocolate negro con un cremoso relleno de vainilla. Perfectas para disfrutar solas, mojadas en leche, o como ingrediente estrella en tus postres favoritos. Su dulce sabor que también añaden un toque de diversión y nostalgia a cada bocado.', '../imagenes/Oreo.png'),
(7, 'Sandwich', 3.50, 'Disfruta de la deliciosa versatilidad de nuestros sándwiches, el snack perfecto para cualquier momento del día. Con una variedad de ingredientes frescos y sabrosos, cada bocado ofrece una explosión de sabores.', '../imagenes/Sandwich.png'),
(8, 'QuesoDedo', 4.99, 'Sumérgete en la deliciosa experiencia de nuestros dedos de queso, el snack perfecto para cualquier ocasión. Estos crujientes palitos están rellenos de queso fundido, ofreciendo un contraste irresistible entre su exterior dorado y su interior cremoso.', '../imagenes/QuesoDedo.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `status` enum('pendiente','tomado','en proceso','entregado') NOT NULL DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_user_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `client_id`, `status`, `created_at`, `delivery_user_id`, `total`) VALUES
(1, 2, 'pendiente', '2024-10-05 01:46:42', 3, 15.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_dishes`
--

CREATE TABLE `order_dishes` (
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `order_dishes`
--

INSERT INTO `order_dishes` (`order_id`, `dish_id`, `quantity`, `price`) VALUES
(1, 1, 1, 12.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('cliente','repartidor','admin') NOT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `payment` enum('card','cash') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `direction`, `payment`) VALUES
(1, 'Ronald Leon', 'ronald@gmail.com', '1234', 'admin', 'Casa de Ronald', 'card'),
(2, 'Oswaldo', 'oswaldo@gmail.com', '1234', 'cliente', 'Casa de Oswaldo', 'cash'),
(3, 'Carlos Carcamo', 'carlos@gmail.com', '1234', 'repartidor', 'Casa de Carlos', 'card');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `delivery_user_id` (`delivery_user_id`);

--
-- Indices de la tabla `order_dishes`
--
ALTER TABLE `order_dishes`
  ADD PRIMARY KEY (`order_id`,`dish_id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`delivery_user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_dishes`
--
ALTER TABLE `order_dishes`
  ADD CONSTRAINT `order_dishes_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
