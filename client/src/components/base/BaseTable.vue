<template>

<div class="outer-table-wrapper">

    <div class="table-wrapper">

        <table class="base-table">

            <thead>

                <tr class="table-header">

                    <th

                        v-for="column in columns"

                        :key="column.field"

                        :style="{

                            width: column.width,

                            textAlign: column.align ?? 'left'

                        }"

                        :class="{

                            sortable: column.sortable

                        }"

                        @click="clickSort(column)">

                        <div class="th-content">

                            <span>

                                {{ column.label }}

                            </span>

                            <span v-if="column.sortable">

                                <i

                                    v-if="sort.field===column.field &&
                                          sort.direction==='asc'"

                                    class="bi bi-chevron-up">

                                </i>

                                <i

                                    v-else-if="sort.field===column.field"

                                    class="bi bi-chevron-down">

                                </i>

                                <i

                                    v-else

                                    class="bi bi-chevron-expand">

                                </i>

                            </span>

                        </div>

                    </th>

                    <th
                        v-if="$slots.actions"
                        class="text-center">

                        Ações

                    </th>

                </tr>

            </thead>

            <tbody>

                <tr

                    v-for="row in rows"

                    :key="row.id"

                    class="table-row">

                    <td

                        v-for="column in columns"

                        :key="column.field"

                        :style="{

                            textAlign: column.align ?? 'left'

                        }">

                        <!-- SLOT -->

                        <slot

                            v-if="column.type==='slot'"

                            :name="column.field"

                            :row="row"

                        />

                        <!-- BADGE -->

                        <span

                            v-else-if="column.type==='badge'"

                            class="badge"

                            :class="'badge-'+badgeColor(column,row)">

                            {{ renderValue(column,row) }}

                        </span>

                        <!-- BOOLEAN -->

                        <span

                            v-else-if="column.type==='boolean'">

                            {{ row[column.field] ? "Sim" : "Não" }}

                        </span>

                        <!-- DATA -->

                        <span

                            v-else-if="column.type==='date'">

                            {{ formatDate(row[column.field]) }}

                        </span>

                        <!-- DATA/HORA -->

                        <span

                            v-else-if="column.type==='datetime'">

                            {{ formatDateTime(row[column.field]) }}

                        </span>

                        <!-- MOEDA -->

                        <span

                            v-else-if="column.type==='currency'">

                            {{ formatCurrency(row[column.field]) }}

                        </span>

                        <!-- NÚMERO -->

                        <span

                            v-else-if="column.type==='number'">

                            {{ formatNumber(row[column.field]) }}

                        </span>

                        <!-- TEXTO -->

                        <span v-else>

                            {{ renderValue(column,row) }}

                        </span>

                    </td>

                    <td

                        v-if="$slots.actions"

                        class="text-center">

                        <slot

                            name="actions"

                            :row="row"

                        />

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

</template>

<script setup>

const emit = defineEmits([
    "sort"
]);

const props = defineProps({

    columns:{

        type:Array,

        default:()=>[]

    },

    rows:{

        type:Array,

        default:()=>[]

    },

    sort:{

        type:Object,

        default:()=>({

            field:null,

            direction:"asc"

        })

    }

});

function clickSort(column){

    if(!column.sortable){

        return;

    }

    emit("sort",column.field);

}

function renderValue(column,row){

    const value=row[column.field];

    if(column.formatter){

        return column.formatter(value,row);

    }

    return value;

}

function badgeColor(column,row){

    if(column.badge){

        return column.badge(row[column.field],row);

    }

    return "secondary";

}

function formatDate(value){

    if(!value){

        return "-";

    }

    return new Date(value).toLocaleDateString("pt-BR");

}

function formatDateTime(value){

    if(!value){

        return "-";

    }

    return new Date(value).toLocaleString("pt-BR");

}

function formatCurrency(value){

    if(value==null){

        return "-";

    }

    return Number(value).toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

function formatNumber(value){

    if(value==null){

        return "-";

    }

    return Number(value).toLocaleString("pt-BR");

}

</script>