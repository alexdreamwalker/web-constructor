# Copyright (c) 2013 The Native Client Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

#
# GNU Make based build file.  For details on GNU Make see:
# http://www.gnu.org/software/make/manual/make.html
#

#
# Get pepper directory for toolchain and includes.
#
# If NACL_SDK_ROOT is not set, then assume it can be found three directories up.
#
THIS_MAKEFILE := $(abspath $(lastword $(MAKEFILE_LIST)))
NACL_SDK_ROOT ?= $(abspath $(dir $(THIS_MAKEFILE))../..)

# Project Build flags
WARNINGS := -Wno-long-long -Wall -Wswitch-enum -pedantic -Werror
CXXFLAGS := -pthread -std=gnu++98 $(WARNINGS)

#
# Compute tool paths
#
GETOS := python $(NACL_SDK_ROOT)/tools/getos.py
OSHELPERS = python $(NACL_SDK_ROOT)/tools/oshelpers.py
OSNAME := $(shell $(GETOS))
RM := $(OSHELPERS) rm

PNACL_TC_PATH := $(abspath $(NACL_SDK_ROOT)/toolchain/$(OSNAME)_pnacl)
PNACL_CXX := $(PNACL_TC_PATH)/bin/pnacl-clang++
GCC_CXX := g++
CLANG_CXX := clang++
EMS_CXX := /home/dreamer/Student/nacl_sdk/pepper.js/emscripten/emcc
PNACL_AR := $(PNACL_TC_PATH)/bin/pnacl-ar
PNACL_RANLIB := $(PNACL_TC_PATH)/bin/pnacl-ranlib
PNACL_FINALIZE := $(PNACL_TC_PATH)/bin/pnacl-finalize
CXXFLAGS := -I$(NACL_SDK_ROOT)/include
LDFLAGS := -L$(NACL_SDK_ROOT)/lib/pnacl/Release -lppapi_cpp -lppapi -ljsoncpp -lsunblind

#
# Disable DOS PATH warning when using Cygwin based tools Windows
#
CYGWIN ?= nodosfilewarning
export CYGWIN

# main goals

.PHONY: all clean

all:

clean: 
	rm -rf *.o
	rm -rf *.a
	rm test-gcc
	rm test-clang
	rm test-nacl.pexe
	rm test-ems.js



# Declare the ALL target first, to make the 'all' target the default build

complectation.o: complectation.cc
	$(PNACL_CXX) complectation.cc -c -o complectation.o

construction.o: construction.cc
	$(PNACL_CXX) construction.cc -c -o construction.o

# sunblind

cornice.o: sunblind/cornice.cc 
	$(PNACL_CXX) -c sunblind/cornice.cc -o cornice.o

lamella.o: sunblind/lamella.cc
	$(PNACL_CXX) -c sunblind/lamella.cc -o lamella.o

layer.o: sunblind/layer.cc
	$(PNACL_CXX) -c sunblind/layer.cc -o layer.o

verticallayer.o: sunblind/verticallayer.cc
	$(PNACL_CXX) -c sunblind/verticallayer.cc -o verticallayer.o

sunblind.o: sunblind/sunblind.cc
	$(PNACL_CXX) -c sunblind/sunblind.cc -o sunblind.o

verticalsunblind.o: sunblind/verticalsunblind.cc 
	$(PNACL_CXX) -c sunblind/verticalsunblind.cc -o verticalsunblind.o

libsunblind.a: cornice.o lamella.o layer.o verticallayer.o sunblind.o verticalsunblind.o
	$(PNACL_AR) cr libsunblind.a cornice.o lamella.o layer.o verticallayer.o sunblind.o verticalsunblind.o
	$(PNACL_RANLIB) libsunblind.a

# test

test-nacl: test.cc libsunblind.a
	$(PNACL_CXX) test.cc -o test-nacl.pexe $(CXXFLAGS) $(LDFLAGS)

test-gcc: test.cc libsunblind.a
	$(GCC_CXX) test.cc -o test-gcc

test-clang: test.cc libsunblind.a
	$(CLANG_CXX) test.cc -o test-clang

test-ems: test.cc libsunblind.a
	$(EMS_CXX) test.cc -o test-ems.js

test: test-nacl test-clang test-gcc test-ems