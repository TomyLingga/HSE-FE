<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" md="12" sm="3" class="text-center">
                <img
                elevation="20"
                src="K3.png"
                height="120"
                >
                <h3 class="mt-3" style="color:#2E7D32;">Utamakan Keselamatan & Kesehatan Kerja</h3>
                <h3 class="text-h2 mt-3">SELAMAT DATANG</h3>
                <h3 class="mt-3" style="color:#757575;">Health, Safety & Environment</h3>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" md="3" sm="3"></v-col>
            <v-col cols="12" md="2" sm="3">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mx-auto"
                    max-width="350"
                    @click="link({path:'/dash'})"
                    >
                        <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
                            <v-icon class="text-h1" color="pink darken-3" x-large>mdi-home-analytics</v-icon>
                            <h3 class="text-h6">DASHBOARD</h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="2" sm="3"></v-col>
            <v-col cols="12" md="2" sm="3">
                <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                >
                    <v-card
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mx-auto"
                    max-width="350"
                    @click="link({path:'/signin'})"
                    >
                        <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
                            <v-icon class="text-h1" color="light-blue darken-3" x-large >mdi-login-variant</v-icon>
                            <h3 class="text-h6">SIGN-IN</h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
                <v-row>
                    <v-col cols="12" sm="12" class="text-center">
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="3" sm="3"></v-col>
        </v-row>
        <v-footer
        fixed
        padless
        >
            <v-card
            flat
            tile
            width="100%"
            class="green darken-1 text-center"
            >
                <v-divider></v-divider>

                <v-card-text class="white--text">
                    <h4>PT. Industri Nabati Lestari</h4>
                    <span style="font-size:14px;">HSE - Copyright &copy; <strong>IT.INL</strong> 2022</span>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        // HelloWorld
    },
    methods:{
        link(test){
            this.$router.push(test);
        }
    }
}
</script>
