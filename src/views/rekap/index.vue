<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-sheet
                min-height="10vh"
                rounded="lg"
                >
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="6">
                                <h3 class="text-h4">Components</h3>
                                <span style="color:green; font-size:14px;">Utamakan Keselamatan & Kesehatan Kerja</span>
                            </v-col>
                            <v-col cols="6" class="text-right">
                                <img
                                elevation="20"
                                src="inl.png"
                                height="40"
                                >
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-col>
            <v-col cols="3" style="background-color:#EEEEEE;" v-if="user.role == 'admin'">
                <v-sheet rounded="lg" style="text-align:left;">
                    <v-list color="transparent" v-model="tab">
                        <v-subheader>Work Program</v-subheader>
                        <v-list-item link @click="link({path:'/activity'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-handball</v-icon>Activity</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link @click="link({path:'/schedule'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-clock</v-icon>Scheduller</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>

                        <v-subheader>Master</v-subheader>
                        <v-list-item link @click="link({path:'/card'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-account-card</v-icon>Cards</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link @click="link({path:'/present'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-image-multiple</v-icon>Presentation</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link  @click="link({path:'/user'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-account</v-icon>User Administrator</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>

                        <v-list-item
                        link
                        color="grey lighten-4"
                        @click="logout"
                        >
                        <v-list-item-content>
                            <v-list-item-title>
                            <v-icon left>mdi-logout</v-icon>Log Out
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>

            <v-col cols="3" style="background-color:#EEEEEE;"  v-else>
                <v-sheet rounded="lg" style="text-align:left;">
                    <v-list color="transparent" v-model="tab">
                        <v-subheader>Work Program</v-subheader>
                        <v-list-item link @click="link({path:'/activities'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-handball</v-icon>Activity</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link @click="link({path:'/schedules'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-clock</v-icon>Scheduller</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>

                        <v-subheader>Master</v-subheader>
                        <v-list-item link @click="link({path:'/presents'})">
                            <v-list-item-content>
                                <v-list-item-title><v-icon left>mdi-image-multiple</v-icon>Presentation</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>

                        <v-list-item
                        link
                        color="grey lighten-4"
                        @click="logout"
                        >
                        <v-list-item-content>
                            <v-list-item-title>
                            <v-icon left>mdi-logout</v-icon>Log Out
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>

            <v-col style="background-color:#EEEEEE;">
                <!-- <v-sheet
                min-height="70vh"
                rounded="lg"
                > -->
                    <router-view/>
                    
                <!-- </v-sheet> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        data: () => ({
            user: JSON.parse(localStorage.user),
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
            tab:''
        }),
        methods:{
            link(test){
                this.$router.push(test);
            },
            logout(){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('usertoken');
                localStorage.removeItem('roles');
                this.$router.push({path:'/signin'});
            }
        },
        created(){
        }
    }
</script>