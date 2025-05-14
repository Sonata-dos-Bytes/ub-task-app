export function getRandomColor() {
  const colors = [
    "#FF5733", // vermelho alaranjado
    "#33FF57", // verde limão
    "#3357FF", // azul royal
    "#F1C40F", // amarelo
    "#8E44AD", // roxo
    "#1ABC9C", // turquesa
    "#E74C3C", // vermelho
    "#2ECC71", // verde
    "#3498DB", // azul
    "#F39C12", // laranja
    "#9B59B6", // lavanda
    "#34495E", // azul escuro
    "#16A085", // verde escuro
    "#D35400", // laranja queimado
    "#7F8C8D"  // cinza
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}