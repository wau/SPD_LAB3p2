install: client_setup server_setup




server_setup:
	cd ServerSide/ && npm install --save @types/node && npm install


client_setup:

	cd ClientSide/ && npm install --legacy-peer-deps && npm install webpack webpack-cli -g
	
	
compile:
	cd ServerSide && npx tsc
	
run: client_run server_run 


client_run:
	cd ClientSide/ && npx webpack

server_run:
	cd ServerSide/ && node build/main.js


