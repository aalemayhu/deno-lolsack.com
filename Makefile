all:
	cat Makefile
	@echo "^ pick one of the targets and run it via make <target>"
run:
	deno run --allow-net --allow-read ./server.ts
fmt:
	deno fmt *.ts
