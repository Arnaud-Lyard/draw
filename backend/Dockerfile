# ============================================
# Stage 1: Composer dependencies
# ============================================
FROM composer:2 AS deps

WORKDIR /app
COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction --no-progress

# ============================================
# Stage 2: Production image (FrankenPHP)
# ============================================
FROM dunglas/frankenphp:latest AS prod

# Install PHP extensions required for the project
RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    intl \
    opcache \
    gd \
    zip \
    apcu

# Copy Caddy/PHP configuration
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY docker/php.ini $PHP_INI_DIR/conf.d/app.ini

# Set working directory
WORKDIR /app

# Copy application source
COPY . .

# Copy vendor from deps stage
COPY --from=deps /app/vendor ./vendor

# Create required directories and set permissions
RUN mkdir -p var/cache var/log var/share \
    && chown -R www-data:www-data var

# Warmup cache and dump autoloader
RUN bin/console cache:warmup --env=prod || true \
    && composer dump-autoload --classmap-authoritative --no-dev

EXPOSE 80

# ============================================
# Stage 3: Development image (FrankenPHP + Xdebug)
# ============================================
FROM dunglas/frankenphp:latest AS dev

# Install PHP extensions (same as prod + xdebug)
RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    intl \
    opcache \
    gd \
    zip \
    apcu \
    xdebug

# Install Composer inside the dev image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Caddy configuration
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY docker/php.dev.ini $PHP_INI_DIR/conf.d/app.ini

WORKDIR /app

# Create required directories
RUN mkdir -p var/cache var/log var/share \
    && chown -R www-data:www-data var

EXPOSE 80
