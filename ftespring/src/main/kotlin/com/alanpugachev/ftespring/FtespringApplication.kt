package com.alanpugachev.ftespring

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FtespringApplication

fun main(args: Array<String>) {
	runApplication<FtespringApplication>(*args)
}
