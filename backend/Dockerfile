# ============================================
# Stage 1: Composer dependencies
# ============================================
FROM composer:2 AS deps

WORKDIR /app
COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction --no-progress

# ============================================
# Stage 2: Production (php-fpm)
# ============================================
FROM php:8.2-fpm-alpine AS prod

RUN apk add --no-cache \
    curl \
    icu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    postgresql-dev \
    linux-headers

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo_pgsql \
    pgsql \
    intl \
    opcache \
    gd \
    zip

RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && apk del .build-deps

COPY docker/php.ini $PHP_INI_DIR/conf.d/app.ini

WORKDIR /app

COPY . .
COPY --from=deps /app/vendor ./vendor

RUN mkdir -p var/cache var/log var/share \
    && chown -R www-data:www-data var public

RUN php bin/console cache:warmup --env=prod || true \
    && composer dump-autoload --classmap-authoritative --no-dev || true

EXPOSE 9000

# ============================================
# Stage 3: Development (php-fpm + xdebug)
# ============================================
FROM php:8.2-fpm-alpine AS dev

RUN apk add --no-cache \
    curl \
    icu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    postgresql-dev \
    linux-headers

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo_pgsql \
    pgsql \
    intl \
    opcache \
    gd \
    zip

RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install apcu xdebug \
    && docker-php-ext-enable apcu xdebug \
    && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY docker/php.dev.ini $PHP_INI_DIR/conf.d/app.ini

WORKDIR /app

RUN mkdir -p var/cache var/log var/share \
    && chown -R www-data:www-data var

EXPOSE 9000
