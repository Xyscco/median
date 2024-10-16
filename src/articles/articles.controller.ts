import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('drafts')
  @ApiCreatedResponse({ type: ArticleEntity })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get()
  @ApiCreatedResponse({ type: ArticleEntity })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Artigo ${id} não existe.`);
    }
    return article;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
