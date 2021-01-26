package com.enums;

public enum MusicClass 
{
	ROOTNAME("전체보기:All Songs"),
	KPOP("가요:K-POP"), 
	FILMTHEME("영화음악:FILM-THEME"), 
	GOSPEL("찬송가:GOSPEL"), 
	ENPOP("팝송:EN-POP"), 
	CHASON("샹송:CHASON"), 
	CLASSIC("클라식:CLASSICAL"),
	KIDS("동요:KIDS"),
	MISC("기타:MISC");
	
	
	private String value = "";
	
	public String getValue()
	{
		return value;
	}
	@Override
	public String toString()
	{
		return this.getValue();
	}
	private MusicClass(String value)
	{
		this.value = value;
	}
}
