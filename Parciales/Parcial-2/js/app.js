let numeros = [];

                document.getElementById('btn_generar').addEventListener('click', () => {
                    do {    
                        numero = Math.floor(Math.random() * 100);
                    }while (numeros.includes(numero));
                    numeros.push(numero);
                    mostrarNumeros();
                });

                document.getElementById('btn_ascendente').addEventListener('click', () => {
                    numeros.sort((a, b) => a - b);
                    mostrarNumeros();
                });

                document.getElementById('btn_descendente').addEventListener('click', () => {
                    numeros.sort((a, b) => b - a);
                    mostrarNumeros();
                });

                function mostrarNumeros() {
                    const contenedor = document.getElementById('contenedor-numeros');
                    contenedor.innerHTML = ''; // Limpiar el contenedor

                    numeros.forEach(num => {
                        const div = document.createElement('div');
                        div.className = 'numero-cuadro';
                        div.textContent = num;

                        if(num<10){
                            div.textContent = "0" + num;
                        }else {
                            div.textContent = num;
                        }
                        contenedor.appendChild(div);
                    });
                
                    console.log(numeros);
                }