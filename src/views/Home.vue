<template>
<div class="flex flex-row items-start justify-center">
  <div class="flex flex-col items-center h-full w-[900px] pt-5 gap-10">
  <div class="flex flex-row w-full gap-10">
    <div class="group w-full h-24">
      <div class="flex flex-col gap-4 items-center">
        <div class="text-3xl">Sen</div>
        <div class="w-full h-10 bg-white">
          <div :style="{width : playerHealth+'%'}" class="transition-all h-full bg-green-700 group-hover:bg-green-600 group-hover:scale-110 group-hover:rounded-md flex flex-row justify-end items-center text-xl pr-2">
            {{playerHealth}}%
          </div>
        </div>
      </div>
    </div>
     <div class="group w-full h-24">
      <div class="flex flex-col gap-4 items-center">
        <div class="text-3xl">Canavar</div>
        <div class="w-full h-10 bg-white flex flex-row justify-end">
          <div :style="{width : monsterHealth+'%'}" class="h-full w-full bg-green-700 group-hover:bg-green-600 group-hover:scale-110 group-hover:rounded-md flex flex-row justify-start items-center text-xl pl-2">
            {{monsterHealth}}%
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!onTheGame" class="w-full h-16 flex flex-row items-center justify-center">
      <button @click="PlayGame()" class="transition-all rounded-md w-30 h-30 bg-green-900 hover:bg-green-700 p-3 text-xl cursor-pointer hover:scale-110 shadow-lg" >Başlat</button>
  </div>
  <div v-if="onTheGame" class="w-full flex flex-col max-h-[500px] overflow-auto items-center justify-center gap-5 bg-containerColor border-2 border-hoverContainer shadow-xl rounded-md">
      <div class="flex flex-row pt-5 gap-3">
        <button @click="playerTurn('normalAttack')" class="transition-all rounded-md w-30 h-30 bg-yellow-300 cursor-pointer text-gray-900 p-3 text-xl hover:scale-110 border-2 border-hoverContainer hover:border-red-300 shadow-lg uppercase">Saldırı</button>
        <button @click="playerTurn('specialAttack')" class="transition-all rounded-md w-30 h-30 bg-yellow-600 cursor-pointer text-gray-200 p-3 text-xl hover:scale-110 border-2 border-hoverContainer hover:border-red-600 shadow-lg uppercase">Özel Saldırı</button>
        <button @click="playerTurn('heal')" class="transition-all rounded-md w-30 h-30 bg-green-300 cursor-pointer text-gray-600 p-3 text-xl hover:scale-110 border-2 border-hoverContainer hover:border-green-600 shadow-lg uppercase">İlk Yardım</button>
        <button @click="escape()" class="transition-all rounded-md w-30 h-30 text-black cursor-pointer bg-gray-300 p-3 text-xl hover:scale-110 border-2 border-hoverContainer hover:border-yellow-100 shadow-lg uppercase">Kaç</button>
      </div>
      <div v-if="actionLogs.length >0" class="overflow-auto rounded-lg shadow-2xl">
        <div class="text-white w-[500px] shadow-lg flex flex-col-reverse">
        <div v-for="(log,index) in actionLogs" :key="index" class="transition-all hover:bg-containerColor hover:scale-105 even:bg-enemyColor bg-allyColor">
          <div class="p-1 px-4">{{log}}</div>
        </div>
      </div>
      </div>
      <div class="h-2"></div>
  </div>
  <div>

  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      health: {
        player: 100,
        monster: 100,
      },
      ability: {
        normalAtack: 10,
        specialAtack: 20,
        heal: 25,
      },
      actionLogs: [],
      onTheGame: false,
    };
  },
  methods: {
    PlayGame() {
      this.onTheGame = true;
      this.initGameArea();
    },
    initGameArea() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    playerTurn(ability) {
      if (ability === 'normalAttack') {
        const Damage = this.randomPicker(this.ability.normalAtack);
        this.monsterHealth -= Damage;
        this.actionLogs.push(`Sen normalAttack yeteneğini kullandı ve Canavar' a ${Damage} hasar verdi `);
      } else if (ability === 'specialAttack') {
        const Damage = this.randomPicker(this.ability.specialAtack);
        this.monsterHealth -= Damage;
        this.actionLogs.push(`Sen specialAttack yeteneğini kullandı ve Canavar' a ${Damage} hasar verdi `);
      } else {
        const healCount = this.randomPicker(this.ability.normalAtack);
        this.playerHealth += healCount;
        this.actionLogs.push(`Sen FirstAidKit yeteneğini kullandı ve ${healCount} iyileşti `);
      }
      this.monsterTurn();
    },
    escape() {
      this.playerHealth = 0;
    },
    monsterTurn() {
      const luckyNumber = this.randomPicker(3);
      if (luckyNumber === 1) {
        const Damage = this.randomPicker(this.ability.normalAtack);
        this.playerHealth -= Damage;
        this.actionLogs.push(`Canavar normalAttack yeteneğini kullandı ve Sen' e ${Damage} hasar verdi`);
      } else if (luckyNumber === 2) {
        const Damage = this.randomPicker(this.ability.specialAtack);
        this.playerHealth -= Damage;
        this.actionLogs.push(`Canavar specialAttack yeteneğini kullandı ve Sen' e ${Damage} hasar verdi`);
      } else if (luckyNumber === 3) {
        const healCount = this.randomPicker(this.ability.heal);
        this.monsterHealth += healCount;
        this.actionLogs.push(`Canavar bandage yeteneğini kullandı ve ${healCount} iyileşti.`);
      }
    },
    randomPicker(multiple) {
      return Math.ceil(Math.random() * multiple);
    },
    restartGame() {
      this.onTheGame = false;
      this.initGameArea();
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        if (window.confirm('Kaybettin. Tekrar oynamak ister misin ?')) {
          this.restartGame();
        }
      } else if (value > 100) {
        this.playerHealth = 100;
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        if (window.confirm('Kazandın. Tekrar oynamak ister misin ?')) {
          this.restartGame();
        }
      } else if (value > 100) {
        this.monsterHealth = 100;
      }
    },
  },
};
</script>
