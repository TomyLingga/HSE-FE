<template>
    <v-app id="inspire">
        <v-app-bar
        app
        color="white"
        flat
        >
            <v-container class="py-0 fill-height">
                <v-avatar
                class="mr-10"
                size="45"
                >
                    <img
                    elevation="20"
                    src="K3.png"
                    height="50"
                    >
                    <!-- <span class="white--text text-h7">HSE</span> -->
                </v-avatar>
                <div v-if="user.role == 'admin'">
                    <v-btn text @click="linked('/accesshome')">Home</v-btn>
                    <v-menu
                    open-on-hover
                    bottom
                    offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            >
                            Components
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(components, index) in links_components_admin"
                            :key="index"
                            link
                            @click="linked(components.path)">
                                <v-list-item-title><v-icon left>{{components.icon}}</v-icon> {{components.view}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu
                    open-on-hover
                    bottom
                    offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            >
                            Observation
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(components, index) in links_observation_admin"
                            :key="index"
                            link
                            @click="linked(components.path)">
                                <v-list-item-title><v-icon left>{{components.icon}}</v-icon> {{components.view}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div v-else-if="user.role == 'user'">
                    <v-btn text @click="linked('/homeuser')">Home</v-btn>
                    <v-menu
                    open-on-hover
                    bottom
                    offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            >
                            Components
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(components, index) in links_components_user"
                            :key="index"
                            link
                            @click="linked(components.path)">
                                <v-list-item-title><v-icon left>{{components.icon}}</v-icon> {{components.view}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu
                    open-on-hover
                    bottom
                    offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            >
                            Observation
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(components, index) in links_observation_user"
                            :key="index"
                            link
                            @click="linked(components.path)">
                                <v-list-item-title><v-icon left>{{components.icon}}</v-icon> {{components.view}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div v-else>
                    <v-btn v-for="(link,index) in links" :key="index" text @click="linked(link.path)">{{link.view}}</v-btn>
                </div>
                <v-spacer></v-spacer>

                <v-responsive max-width="260" class="text-right">
                    <v-menu
                    bottom
                    origin="center center"
                    transition="scale-transition"
                    offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            fab
                            text
                            small
                            >
                                <v-icon large>mdi-account-circle</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-list-item-title>My Name</v-list-item-title>
                            </v-list-item>
                            <v-list-item link @click="logout" style="font-size:13px;">
                                <v-list-item-subtitle><v-icon left>mdi-logout</v-icon> Logout</v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <router-view class="mb-10"/>
            <!-- <v-sheet class="text-center" width="100%">
            </v-sheet> -->
            <v-footer
            padless
            fixed
            >
                <v-container fluid class="text-center">
                    <span style="font-size:14px;"><strong style="color:#388E3C;">Digital HSE</strong> - Copyright &copy; <strong>IT.INL</strong> 2022</span>
                </v-container>
            </v-footer>
        </v-main>
    </v-app>
</template>
<script>

    // API Axios
    import UserService from '@/api/api_user';

    export default {
        data: () => ({
            user: JSON.parse(localStorage.user),

            // Admin Menu
            links_components_admin: [
                {path:'/activity',view:'Activity', icon:'mdi-handball'},
                {path:'/schedule', view:'Schedule', icon:'mdi-clock'},
                {path:'/card', view:'Cards', icon:'mdi-account-card'},
                {path:'/present', view:'Presentation', icon:'mdi-image-multiple'},
                {path:'/user', view:'User Administrator', icon:'mdi-account'},
            ],
            links_observation_admin: [
                {path:'/m_observation',view:'Master Observation', icon:'mdi-alert-plus'},
                {path:'/my_observation', view:'My Observation', icon:'mdi-alert'},
                {path:'/report_observation', view:'Report Observastion', icon:'mdi-alarm-light'},
            ],

            // User Menu
            links_components_user: [
                {path:'/activities',view:'Activity', icon:'mdi-handball'},
                {path:'/cards', view:'Cards', icon:'mdi-account-card'},
                {path:'/schedules', view:'Schedule', icon:'mdi-clock'},
                {path:'/presents', view:'Presentation', icon:'mdi-image-multiple'},
            ],
            links_observation_user: [
                {path:'/m_observations',view:'Master Observation', icon:'mdi-alert-plus'},
                {path:'/my_observations', view:'My Observation', icon:'mdi-alert'},
                {path:'/report_observations', view:'Report Observastion', icon:'mdi-alarm-light'},
            ],
            links: [
                {path:'/beranda',view:'Home'},
                {path:'/temuan', view:'Observation'},
            ],
        }),
        methods:{
            linked(test){
                this.$router.push({path:test});
            },
            logout(){
                UserService.logout().then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('usertoken');
                localStorage.removeItem('roles');
                this.$router.push({path:'/signin'});
            }
        }
    }
</script>