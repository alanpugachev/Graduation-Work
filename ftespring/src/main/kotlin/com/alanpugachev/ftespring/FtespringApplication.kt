package com.alanpugachev.ftespring

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class FtespringApplication

fun main(args: Array<String>) {
	runApplication<FtespringApplication>(*args)
}
