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
CXXFLAGS := -pthread -std=gnu++11 -stdlib=libc++ $(WARNINGS)

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
GXXFLAGS := -I/usr/include
LDFLAGS := -L$(NACL_SDK_ROOT)/lib/pnacl/Release -lppapi_cpp -lppapi -ljsoncpp
LDGLIBCFLAGS := -L$(NACL_SDK_ROOT)/lib/glibc_x86_64/Release -lppapi_cpp -lppapi_simple -ljsoncpp

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
	rm -rf *.pexe
	rm -rf *.js
	rm -rf *.run



# Declare the ALL target first, to make the 'all' target the default build
# test

sunblind-nacl: sunblindtest.cc
	$(PNACL_CXX) sunblindtest.cc -o sunblindtest-nacl.pexe $(CXXFLAGS) $(LDFLAGS)

sunblind-gcc: sunblindtest.cc
	$(GCC_CXX) sunblindtest.cc -o sunblindtest-gcc.run $(GXXFLAGS)

sunblind-clang: sunblindtest.cc
	$(CLANG_CXX) sunblindtest.cc -o sunblindtest-clang.run $(CXXFLAGS)

sunblind-ems: sunblindtest.cc
	$(EMS_CXX) sunblindtest.cc -o sunblindtest-ems.js

sunblind: sunblind-nacl sunblind-clang sunblind-gcc sunblind-ems