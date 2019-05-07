allowedOpts ?= "--allow-net"

all:
	cat Makefile
	@echo "^ pick one of the targets and run it via make <target>"
run:
	deno run ${allowedOpts} ./server.ts
