<template>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1><router-link to="/">我的博客</router-link></h1>
            </div>

            <ul class="nav-menu">
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/blog">博客</router-link></li>
                <li><router-link to="/about">关于</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped>
.header {
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0px;
    z-index: 100;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.nav-brand h1 {
    color: var(--primary-color);
    font-size: 1.5rem;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.router-link {
    text-decoration: none;
    color: var(--link-color);
    font-weight: bold;
    transition: color 0.3s ease;
}

.router-link:hover {
    color: var(--link-hover);
    transform: translateY(-1px); /* 轻微悬浮效果 */
}
</style>